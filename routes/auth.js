//importing required modules
const express = require('express');
const passport = require('passport');
const router = express.Router();
//send to google do the authentication
//profile gets us their basic info(name) and email gets emails
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

//callback after google has authenticated the user
router.get(
    '/google/callback',
    passport.authenticate('google', {failureRedirect: '/'}),
    (req, res)=>{res.redirect('/log')}
);

//logout
router.get('logout', (req, res)=> {
    req.logout();
    res.redirect('/');
})

module.exports = router;