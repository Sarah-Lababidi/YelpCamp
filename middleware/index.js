var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    // Check if someone is logged in
    if(req.isAuthenticated()){
        // Get the campground id to compare its autor id to the currently logged user id
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Unfortunately, You Don't Have Permission To Do This");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login First");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next){
    // Check if someone is logged in
    if(req.isAuthenticated()){
        // Get the campground id to compare its autor id to the currently logged user id
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "Unfortunately, You Don't Have Permission To Do This");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login First");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
};

module.exports = middlewareObj;









