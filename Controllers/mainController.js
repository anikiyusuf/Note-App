
// Get Home Page
const homepage = async  (req, res) =>{
    const locals = {
        title: 'Notes',
        description:"Free Nodejs Notes App"
    }
    res.render('index' , {
        locals,
    })
}

// Get About


const about = async (req, res) => {
    const locals ={
        title: "About - Nodejs Notes",
        description:" Notes"
    } 
    res.render('about' , locals)
}


module.exports = { homepage ,  about}