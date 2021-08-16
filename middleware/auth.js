//before creating the index.js file
//we have to create our middleware
//to ensure that the user is auth or not
module.exports = {
    //if user is auth then redirect to the next page
    //else redirect to login page
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        }
    }, 
    //if user is auth and going to login page
    //then redirect to home page
    //if not auth redirect to login page
    ensureGuest: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/log');
        }
    },
}