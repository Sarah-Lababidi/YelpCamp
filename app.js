var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    seedDB          = require("./seeds.js"),
    methodOverride  = require("method-override"),
    User            = require ("./models/user.js"),
    flash           = require("connect-flash");

// Requiring Routes
var campgroundRoute = require("./routes/campground"),
    commentRoute    = require("./routes/comment"),
    authRoute       = require("./routes/auth");


mongoose.connect("mongodb://localhost/yelp_camp"); 
app.use(require("express-session")({
    secret: "Rusty is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(methodOverride("_method"));   
app.use(flash());    
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));  // this needs to be before bodyParser i think
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
}); 
// seedDB();


// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentRoute);
app.use(authRoute);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server Has Started...");
});
