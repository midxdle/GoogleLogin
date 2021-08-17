//import all necessary modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoDbStore = require('connect-mongo');
require('./config/passport')(passport);

//connect to mongodb and set express template
let app = express();
const PORT = process.env.PORT||3000;
dotenv.config({ path: './config/config.env'});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.use(express.static('public'));
app.set('view engine', 'ejs');

//initialize middleware and setup database for storing sessions
app.use(express.urlencoded({extended:true}));
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoDbStore.create({ mongoUrl: process.env.MONGO_URI/*mongooseConnection: mongoose.connection*/}),
    })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//last import routes
app.use(require("./routes/index"));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, console.log(`listening at ${PORT}`));