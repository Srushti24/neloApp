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
var counter = 0;


//First gets preference of the entire group,
//then the name of restaurants that meet the criteria of time, tables
//Then get the average distance of all the members in the group
// There is a helper function which is used, which thorws promise for my async function to handle
//promises and async-await used as alot of database queires being made

async function parent(temp, start, end) {
    var preference = [];
    var firstmap = new Map();
    var restaurant_id = [];
    var x=0;
    var y=0;
    
    var s = temp.join(",");

    //get preference of all people
    let sql1 = `SELECT preference FROM Persons_details WHERE person_id IN ( ${s})`;
    var row1 = await helper(sql1,temp, start, end,s);
    for (var r in row1) {
        if (!firstmap.has(row1[r].preference)) {
            firstmap.set(row1[r].preference, r);
            preference.push(row1[r].preference);
        }
    }

    // get restaurants that meet criteria
   
    var a;
    if (temp.length > 4 && temp.length <= 6) {
        a = "six";
    }
    else if (temp.length > 2 && temp.length <= 4) {
        a = "four";
    }
    else {
        a = "two";
    }
    let sql2 = `SELECT * FROM Restaurant WHERE start<=${start} AND ${end}<=end AND no_of_${a}>=1`;
    var row2 = await helper(sql2, temp, start, end, a);
    for (var r in row2) {
        restaurant_id.push(row2[r]);
     
    }


    //get the average distance between friends
    let sql3 = `SELECT location_x AS x, location_y AS y FROM Persons WHERE id IN ( ${s})`;
    var row3 = await helper(sql3, temp, start, end, a);
    for (var r in row3) {
        x = x + row3[r].x;
        y = y + row3[r].y;
    }
    x = x / temp.length;
    y = y / temp.length;


    calculations.calculator(preference, restaurant_id, temp, start, end, x, y);
}



function helper(sql,temp, start, end, s) {
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
}

//First i check if any of those people have a reservation which conflicts with the new reservation
//If thats the case no need for any calculations
 function check_if_present(temp, start, end) {
    var s = temp.join(",");
    let sql = `SELECT * FROM Restaurant_relation WHERE start BETWEEN ${start - 2} AND ${start + 2} AND end BETWEEN ${end - 2} AND ${end + 2} AND person_id IN ( ${s})`;
    console.log("sql is" + sql);
     db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            if (rows.length > 0) {
                console.log("Not able to make reservation as a reservation is already present");
            }
            else {
                parent(temp, start, end);
            }

        }


    });

}

function book_seat(temp,restaurant_id,start,end) {
    var placeholder = counter+","+restaurant_id + "," + start + "," + end;
    let sql = `INSERT INTO Restaurant_relation(id,Restaurant_id,start,end) VALUES (` +placeholder `+)`;

    // output the INSERT statement
    console.log(sql);

    db.run(sql, languages, function (err) {
        if (err) {
            return console.error(err.message);
        }
        else {

            let sql = `INSERT INTO Restaurant_relation_details(relation_id,person_id) VALUES (` + counter`+)`;

            // output the INSERT statement
            console.log(sql);

            db.run(sql, languages, function (err) {
                if (err) {
                    return console.error(err.message);
                }
                else {
                }
            });
        }
    });

}


exports.parent = parent;
exports.check_if_present = check_if_present;


