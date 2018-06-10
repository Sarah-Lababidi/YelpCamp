var Campground = require("./models/campground.js");
var Comment = require("./models/comment.js");
var User = require("./models/user.js");

var data = [
    {
        name:"Poconos Camping",
        image :"https://res.cloudinary.com/simpleview/image/upload/c_limit,f_auto,h_1200,q_75,w_1200/v1/clients/poconos/Campgrounds_Tent_Sites_Woman_Hemlock_Campground_4_PoconoMtns_06f196d5-8814-4803-a132-8a4daae1755e.jpg",
        description:" Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
        
    },
    {
        name:"Parents Camp",
        image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJi0JdTBoxpdRcZtlfLM9XHkQYcCbTrvozZ6VHEMLKYBzzm6umJQ",
        description:" Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
        
    },
    {
        name:"National Park",
        image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ6LVmvggl4ReObG1nkHDREf6Cm6-3cmZvL1u4MHiJdJC0KhaQpw",
        description:" Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
        
    }
];

var comment = { text: 'This is my first comment', author: 'Sarah' };

function seedDB(){
    Campground.remove({}, function(err){
    if(err){
        console.log("couldn't remove them");
        console.log(err);
    } else {
        console.log("removed all campgrounds!");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){console.log("Couldn't create campground!");}
                else{
                    console.log("Created a new campground!");
                    Comment.create(comment, function(err, comment){
                        if(err){console.log(err);}
                        else{
                            campground.comments.push(comment);
                            campground.save();
                        }
                    });
                }
            });
        });
    }
});
// User.remove({}, function(err){
//     if(err){console.log(err)}
//     else{console.log("All Users Deleted!");}
// });

}
module.exports = seedDB;