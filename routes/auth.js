 var express = require ("express");
 var router  = express.Router({mergeParams:true});
 var passport = require("passport");
 var User = require("../models/user.js");
    
// Routes
router.get("/", function(req, res){
  res.render("landing");
});

router.get("/register", function(req, res){
    currentUser = res.locals;
    res.render("register");
});

router.post("/register", function(req, res){
    User.register(new User({username:req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp " + user.username.charAt(0).toUpperCase() + user.username.slice(1));
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", function (req, res, next){
    passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Welcome to YelpCamp "+req.body.username +"!"
})(req, res)
});


router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged Out!");
    res.redirect("/campgrounds");
});



module.exports = router;

