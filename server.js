const person_info = require('./controllers/person_info');
const express = require('express');
const app = express();

var sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json()); 

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
    
        res.json("connected");
});




    app.post("/api", function(req, res){
        var temp = req.body.id;
        var start = req.body.start;
        //console.log(property)
        
        console.log(temp);
        // person_info.check_if_present(temp, start, start+2);
        person_info.check_if_present([1, 2, 3], 8, 10);
        res.json("hello world");
});

app.delete("/api/delete", function (req, res) {
    var temp = req.body.id;
    var value = req.body.value;
    //console.log(property)

    console.log(temp);
    console.log(value);
    // person_info.check_if_present(temp, start, start+2);
    person_info.delete_booking([1,2,3], 1);
    res.json("hello world");
});


