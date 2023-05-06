const Notes = require('../models/Notes')
const mongoose = require('mongoose')


const dashboard = async (req,res) => {
    let perPage = 12 
    let page = req.query.page || 1


    const locals = {
        title:"Dashboard",
        description:"Notes App"
    }

    try{
        const notes = await Notes.aggregate([
            {  $sort:  { updateAt: -1 } },
            {$match :{ user: mongoose.Type.ObjectId(req.user.id)}},
              
            {
                $project: {
                    title: { $substr: ["$title" , 0 , 30]},
                    body : { $substr: ["$body" , 0 , 100]}
                },
            }
        ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Notes.count()

        res.render('/index' , {
            displayName:req.user.displayName,
            locals,
            notes,
            layout:"../views/dashboard",
            current:page,
            pages: Math.ceil(count / perPage)
        })
    }
    catch(error){
        console.log(error)
    }
}

// Get By Id
const dashboardViewNote = async (req,res) =>{
    const  note = await Notes.find({ _id :req.params.id})
    .where({ user:req.user.id})
    .lean()

    if(note){
        res.render("../views/view-note" , {
            noteID:req.params.id,
            note, });
    }else{
        res.send("something went wrong.")
    }
}   



// Update By Id
const dashboardUpdateNote = async(req,res) =>{
    try{
        await Notes.findOneAndUpdate(
            { _id:req.params.id},
            { title:req.body.title , body: res.body.body , updateAt : Date.now()}
        ).where({ user: req.user.id})
        res.redirect("/dashboard");
    }catch(error){
        console.log(error);
    }
}


const dashboardDeleteNote = async (req,res) =>{
    try{
        await Notes.deleteOne({ _id: req.params.id})
        .where({ user: req.params.id})
        res.redirect("/dashboard")
    }catch(error){
        console.log(error)
    }
}



// Add NNew Notes 
const dashboardAddNote = async(req,res) =>{
    res.render("../views/add.ejs")
}


const dashboardAddNoteSubmit = async (req,res) => {
    try{
        req.body.user = req.user.id;
        await Notes.create(req.body)
        res.json("/dashboard")
    }catch(error){
        console.log(error)
    }
}


// Search Api
const dashboardSearch = async(req,res)=>{
    try{
        res.render("../views/search", {
            searchResult:"",
        });
    }catch(error){
        console.log(error)
    }
}

const  dashboardSearchSubmit = async(req,res) =>{
    try{
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g,"" )


        const searchResults = await Notes.find({
            $or:[
                {title : { $regex: new RegExp(searchNoSpecialChars, "i")}},
                {body : { $regex:new RegExp(searchNoSpecialChars, "i")}}
            ],
        }).where({ user : req.user.id});

        res.render("../view/search" , {searchResults});
    }catch(error){
        console.log(error)
    }
} 
 
module.exports = { dashboard , dashboardViewNote ,dashboardDeleteNote ,   dashboardAddNoteSubmit ,dashboardAddNote , dashboardUpdateNote , dashboardSearch , dashboardSearchSubmit}