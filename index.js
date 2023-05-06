require('dotenv').config()
const express = require("express")
const  {connectionMongoDB} = require("./db")
const session = require("express-session")
const methodOverride = require("method-override")
const passport = require("passport")
const bodyParser = require("body-parser")
const authRouter = require("./Routes/auth")
const MongoStore = require("connect-mongo")


const dashBoardRouter = require("./Routes/dashboard")



const app = express()
const PORT = process.env.PORT 
const MONGODB = process.env.MONGODB

app.use(session({
    secret:'keyboard',
    resave: 'false',
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: MONGODB
    })
})

)

app.use(passport.initialize())
app.use(passport.session())
// Connect to database
connectionMongoDB()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(methodOverride("_method"));


app.set("view engine", 'ejs')
app.set("views", "views");




app.use("/", authRouter )
app.use("/dash" , dashBoardRouter)




app.get("/index", (req,res) =>{
    res.render("index" , {"name": "John"})
})

app.get("/dashboard", (req,res)=>{
    res.render("dashboard")
})

app.get("/view-note" , (req,res) =>{
    res.render("view-note")
})

app.get("/search" , (req,res)=>{
    res.render("search")
})
app.get("/add" , (req,res) =>{
    res.render("add")
})

app.get("/about", (req,res) =>{
    res.render("about")
})


app.get("*" , (req,res) =>{
    res.status(404).render("404")
})









app.listen(PORT , () =>{
    console.log(`Server running on localhost:${PORT}`)
})









