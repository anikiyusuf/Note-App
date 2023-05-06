require("dotenv").config()
const express = require("express")
const authRouter = express.Router()
const passport = require("passport")
var GoogleStrategy = require('passport-google-oauth20').Strategy;
 const User = require("../models/User")

GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
GOOGLE_URL= process.env.GOOGLE_URL



passport.use(
  new GoogleStrategy(
    {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_URL
  },
   async function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    const newUser = {
        googleId: profile.sub,
        displayName: profile.displayName,
        firstName:profile.givenName,
        lastName:profile.familyName,
        profileImage: profile.photos[0].value
    }
    try{

      let user = await User.findOne( { googleId :profile.id})
     if (user){
        done(null , user)
     }else{
        user = await User.create(newUser);
        done(null,user)
     }



    }catch(error){
        console.log(error)
    }
  }
));







authRouter.get('/auth/google',
  passport.authenticate('google', { scope: ["email", "profile"]}));

authRouter.get('/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: '/login-failure',
    successRedirect:"/dashboard"
 }),

  
  );

  authRouter.get("/login-failure" , (req,res) =>{
    res.send("something went wrong...")
  })

//   Logout
authRouter.get("/" , (req,res)=>{
    req.session.destroy(error => {
        if(error){
            console.log(error)
            res.send('Error login out');
        }else{
            res.redirect('/')
        }
    })
})
//   Resist user data
  passport.serializeUser(function(user, done){
    done(null , user.id)
  })

//   Retrieve user data from session
passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(function(user) {
        done(null, user);
      })
      .catch(function(err) {
        done(err, null);
      });
  });


module.exports = authRouter