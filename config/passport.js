//importing modules that needed
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
const dotenv = require('dotenv');
dotenv.config();


module.exports = function(passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
            },
            async (accesToken, refreshToken, profile, done)=> {
                //get the user data from google
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                    email: profile.emails[0].value
                }

                try {
                    //find the user in our database
                    let user = await User.findOne({ googleId: profile.id})

                    if(user) {
                        //if user present in our db
                        done(null, user)
                    } else {
                        //if user is not, save user to db
                        user = await User.create(newUser)
                        done(null, user)
                    }
                } catch(err) {
                    console.log(err);
                }
            }
        )
    )

    //used to serialize the user for session
    passport.serializeUser((user, done)=>{
        done(null, user.id)
    });
    
    //used to deserialize the user for session
    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>done(err, user))
    });
}