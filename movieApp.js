var express = require("express");
var app = express();
var request = require("request");
var apiUrl = "http://www.omdbapi.com/?apikey=93bbec1b&&";

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.listen(3000,function(){
    console.log("Movinfo Server Started..");
});

app.get("/",function(req, res){
    res.render("index");
});

app.get("/:imdb",function(req, res){
    let searchText = req.params.imdb;
    let searchBy = "i";
    let url = apiUrl + searchBy + "=" + searchText;
    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            let movie = JSON.parse(body);
            res.render("movie",{movie:movie});
        } else{
            console.log(error);
        }
    }); 
});

app.post("/searchMovie",function(req, res){
    let  searchText = req.body.searchText;
    let  searchBy = req.body.searchBy;
    let  url = apiUrl + searchBy + "=" + searchText;

    request(url,function(error,response,body){
        if(!error && response.statusCode == 200){
            let movieData = JSON.parse(body);  
            res.render("movieList",{data : movieData});       
        } else{
            console.log(error);
        }
    });
});
