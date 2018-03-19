var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//     name: "Bench Hill",
//     image: "https://media-cdn.tripadvisor.com/media/photo-s/01/d9/bc/da/cougar-rock-campground.jpg",
//     description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
        
//     }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(campground);
//     }
// });

// var campgrounds = [
//         {name: "Slamon Creek", image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242_960_720.jpg"},
//         {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242_960_720.jpg"},
//         {name: "Mountain Goat's Rest ", image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242_960_720.jpg"},
//         {name: "Slamon Creek", image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242_960_720.jpg"},
//         {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242_960_720.jpg"},
//         {name: "Mountain Goat's Rest ", image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242_960_720.jpg"},
//         {name: "Slamon Creek", image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242_960_720.jpg"},
//         {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242_960_720.jpg"},
//         {name: "Mountain Goat's Rest ", image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242_960_720.jpg"}
//         ];

app.get("/", function(req, res){
    res.render("landing");
});


//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    //GET ALL CAMPGROUNDS FROM DB
    Campground.find({}, function(err,allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("index", {campgrounds: allCampgrounds});
       }
    });
        //res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE - add new campgrounds to the database
app.post("/campgrounds", function(req, res){
    //res.send("You hit the postpage");
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampGround = {name: name, image: image, description: description};
    Campground.create(newCampGround, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    //campgrounds.push(newCampGround);
    //redirect to campgrounds page
});

//NEW - show form to create campgrounds
app.get("/campgrounds/new", function(req,res){
    res.render("new"); 
});


//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(req.params);
           console.log(err);
       } else {
           res.render("show", {campground: foundCampground});
       }
    });
    
    //render show template with more info about campground
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The yelpcamp server has started!");
});