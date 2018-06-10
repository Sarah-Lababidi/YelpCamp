var express     = require("express");
var   router      = express.Router({mergeParams: true});
var  Campground  = require("../models/campground");
var Comment  = require("../models/comment");
var middlewareObj = require("../middleware");

    

// New Route
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){console.log(err);}
        else {
            res.render("comment/new", {campground: foundCampground});
        }
    });
});

// Create Route
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){console.log(err);}
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){console.log(err)}
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+ req.params.id);
                }
            });
        }
    });
});

// Edit Route
router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err){
            console.log(err);
        } else {
             res.render("comment/edit", {campgroundId: req.params.id, comment: foundComment});
        }
    });
});

// Update Route
router.put("/:comment_id/", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

// Destroy Route
router.delete("/:comment_id/", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});




module.exports = router;







