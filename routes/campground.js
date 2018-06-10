var express     = require("express");
var    router      = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var middlewareObj = require("../middleware");

// Index Route
router.get("/", function(req, res){
     // get campgrounds from my database
     Campground.find({}, function(err, allCampgrounds){
         if(err){
             console.log("Something Went Wrong!");
             console.log(err);
         }else{
             res.render("campground/index", {campgrounds:allCampgrounds});
         }
     });
 });
 
 // New Route
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    res.render("campground/new");
});

// Create Route
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    var name        = req.body.name;
    var image       = req.body.image;
    var description = req.body.description;
    var price       = req.body.price;
    var author      = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: author, price:price};
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log("Something Went Wrong!");
            console.log(err);
        }else{
            console.log("All Is Good!");
            console.log(newlyCreated);
        }
    });
    res.redirect("/campgrounds");
});

// Show Route
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundedCamp){
        if(err){
            console.log("Something Went Wrong!");
            console.log(err);
        } else {
            res.render("campground/show", {campground: foundedCamp});
        }
    });
});

// Edit Route
router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campground/edit", {campground:foundCampground});
        }
    });
});

// Update Route
router.put("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds/"+ campground._id);
        }
    });
});

// Destroy Route
router.delete("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;

