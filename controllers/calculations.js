const person_info = require('./person_info');

//helps in filtering out only those retaurants that meets the  dietry criteria of the group
function calculator(preference, restaurant_id, temp1, start, end, x, y) {
    console.log("start");
    console.log("temp is" + temp1);
    var arr = [];
    var restaurant_criteria = [];
    //console.log(preference);
    //console.log(restaurant_id);
    for (var i = 0; i < preference.length; i++)
    {
        arr.push(preference[i] + "-" + "friendly");
    }
    //console.log("sanam");
    for (var j = 0; j < restaurant_id.length; j++)
    {
        var temp = restaurant_id[j].preference.split(" ");
        if (checkCriteria_two(arr, temp) === true) {
            restaurant_criteria.push(restaurant_id[i]);
        }
    }
    if (restaurant_criteria.length < 0) {
        console.log("No such restaurant present which meets the groups requirements");
    }
    else {
       // console.log("temp is" + temp);
        find_dist(x, y, restaurant_criteria,temp1,start,end);
    }
   
}

//find the one with minimum distance and then update in the database
function find_dist(x, y, restaurant_criteria,temp1,start,end) {
   // console.log("final dist");
    console.log("temp is" + temp1);
    var index = 0;
    var min = Number.MAX_VALUE;
    for (var i = 0; i < restaurant_criteria.length; i++) {
        var p = restaurant_criteria[i].location_x;
        var q = restaurant_criteria[i].location_y;
       // temp.push((p - x) + (q - y));
        var j = (p - x) + (q - y);
        if (j < min) {
            index = i;
            min = j;
        }
    }
   // console.log("index is " + index);
   // console.log("temp is" + temp);
    make_booking(temp1, restaurant_criteria[index].id,start,end);

}

var relation_id = 0;


//make the booking
async function make_booking(temp1, number, start, end) {
    relation_id++;
    console.log("over here");
    console.log("temp is" + temp1);
    for (var t = 0; t < temp1.length; t++) {
        let sql1 = `INSERT INTO Restaurant_relation(restaurant_id,start,end,relation_id,person_id) VALUES (${number},${start},${end},${relation_id},${temp1[t]})`;
        var row3 = await person_info.helper(sql1, temp1, start, end, "");
    }
    console.log("booking completed");
}








//Checks if the restaurant meets all the dietry need of the group
function checkCriteria_two(arr,temp) {
    const result = arr.every(val => temp.includes(val));
    return result;
}


exports.calculator = calculator;