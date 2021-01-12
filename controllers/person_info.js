var sqlite3 = require('sqlite3').verbose();
const calculations = require('./calculations');

var db = new sqlite3.Database('C:/Users/srush/OneDrive/Desktop/database/db.db', (err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("no error");
    }
});






//The restaurant has that many tables at that particular time
function checkCriteria_one(preference,temp,start,end,members)
{
    var s;
    var restaurant_id = [];
    if (members > 4 && members <= 6) {
        s = "six";
    }
    else if (members > 2 && members <= 4) {
        s = "four";
    }
    else {
        s = "two";
    }
    let sql = `SELECT * FROM Restaurant WHERE start<=${start} AND ${end}<=end AND no_of_${s}>=1`;
    console.log(sql);
    var f = false;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            rows.forEach((row) => {
                console.log("final row name " + row.id);
               
                restaurant_id.push(row);
                
            });

            calculations.calculator(preference, restaurant_id, temp, start, end, members);
        }

    });
   
}

// Each person's preference
function get_pref(temp,start,end,members) {
    var firstmap = new Map();
    var preference = [];
    var s = temp.join(",");
   // console.log(s);
    let sql = `SELECT preference FROM Persons_details WHERE person_id IN ( ${s})`;
    const result = db.all(sql, [], (err, rows) => {
            if (err) {
                console.log(err);
                throw err;
            }
            else {
                // console.log("value is" + rows.length);
                var i = 1;
                rows.forEach((row) => {
                    if (!firstmap.has(row.preference)) {
                        firstmap.set(row.preference, i);
                       preference.push(row.preference);
                        i++;
                        console.log("map size is" + firstmap.size);
                    }
                });
                checkCriteria_one(preference, temp, start, end, members);
              }
    });

}
exports.get_pref = get_pref;

//function getDistance()

/*
function getDistance(item, start, end, members) {
    var x = 0;
    var y = 0;
    var s = item.join(",");
    get_pref(item);
    let sql = `SELECT location_x AS x, location_y AS y FROM Persons WHERE id IN ( ${s})`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            rows.forEach((row) => {
                x = x + row.x;
                y = y + row.y;
            });
            x = x / item.length;
            y = y / item.length;
            findRestaurant(x, y, start, end, members);
        }
    });
}




function findRestaurant(x, y, start, end, members) {
    let firstmap = new Map();
    var check = true;
    var d = 5;
    var prev_x = x;
    var prev_y = y;
    var counter = 0;
    while (check == true && counter < 10) {
        check = true;
        let sql2 = `SELECT * FROM Restaurant WHERE location_x<=${x + d} AND location_x>=${prev_x} AND location_y<=${y + d} AND location_y>=${prev_y}`;
        console.log(sql2);
        db.all(sql2, [], (err, rows) => {
            if (err) {
                console.log(err);
                throw err;
            }
            else {
                rows.forEach((row) => {
                    console.log("row id is" + row.id);
                    var ans1 = checkCriteria_one(row.id, start, end, members);
                    console.log("ans is" + ans1);
                    check = !ans1;
                    console.log("yolo");
                });

            };
        });
        prev_x = x + d;
        prev_y = y + d;
        d = d + 20;
        counter++;
    }
}


*/





//exports.getDistance = getDistance;

//exports.meet_criterias = meet_criterias;