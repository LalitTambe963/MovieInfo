var express = require("express");
var app = express();
var request = require("request");

global.movieDatas = new Object();
var movie;

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.listen(3000,function(){
    console.log("Movinfo Server Started..");
});

app.get("/",function(req, res){
    res.render("public/index.html");
});

app.get("/:imdb",function(req, res){
    var searchText = req.params.imdb;
    var searchBy = "i";
    var url ="http://www.omdbapi.com/?apikey=93bbec1b&&" + searchBy + "=" + searchText;
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            movie = JSON.parse(body);
            // var array = Object.entries(movie);
            res.render("movie",{movie:movie});
        } else{
            // console.log("No Internet Connection");
            console.log(error);
        }
        // res.send(array); 
        // console.log(movie); 
        // res.render("movieList",{data : movieData});
    }); 
});

app.post("/searchMovie",function(req, res){
    var searchText = req.body.searchText;
    var searchBy = req.body.searchBy;
    movieData = {key : "value"};
    // console.log(req.body);
    var url ="http://www.omdbapi.com/?apikey=93bbec1b&&" + searchBy + "=" + searchText;
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            movieData = JSON.parse(body);
            // console.log(movieData);    
            res.render("movieList",{data : movieData});       
        } else{
            console.log("No Internet Connection");
            console.log(error);
        }
        // movieDatas = movieData;
        
        // console.log(movieData.Search[0]);
        
    });
    // console.log(movieDatas);
    // res.render("movieList",{movies : movieData});
});
