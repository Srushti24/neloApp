const person_info = require('./controllers/person_info');

var express = require("express");
var app = express();

var sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
    
        res.json("connected");
});



app.get("/api", (req, res) => {




    //person_info.getDistance(temp, 8, 10, temp.length);
    var temp = [1, 2, 3];
    person_info.get_pref(temp, 8, 10, temp.length);
    // person_info.meet_criterias(temp, 8, 10, temp.length);
});


    app.post("/api", (req, res) => {
        console.log(req.body);
        res.json("hello world");
    });
