const router = require('express').Router()

//importing middleware
const {ensureAuth, ensureGuest} = require('../middleware/auth');

//redirect ensured guest to login page
router.get('/', ensureGuest, (req, res)=> {
    res.render('login')
});

//redirect ensured auth to index page
router.get("/log", ensureAuth, async(req, res)=>{
    res.render('index', {userinfo:req.user})
});

module.exports = router;