const person_info = require('./person_info');
//helps in filtering out only those retaurants that meets the  dietry criteria of the group
function calculator(preference, restaurant_id, temp1, start, end, x, y) {
    var arr = [];
    var restaurant_criteria = [];
   
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
    var a;
    var value;
    if (temp1.length > 4 && temp1.length <= 6) {
        a = "six";
        value = restaurant_criteria[index].no_of_six;
    }
    else if (temp1.length > 2 && temp1.length <= 4) {
        a = "four";
        value = restaurant_criteria[index].no_of_four;
    }
    else {
        a = "two";
        value = restaurant_criteria[index].no_of_two;
    }
  //  console.log("a is" + a);
    //console.log("value is" + value);
    make_booking(temp1, restaurant_criteria[index].id,a,value,start,end);

}

var relation_id = 0;


//make the booking
async function make_booking(temp1, number,a,value, start, end) {
    relation_id++;
    for (var t = 0; t < temp1.length; t++) {
        let sql1 = `INSERT INTO Restaurant_relation(restaurant_id,start,end,relation_id,person_id) VALUES (${number},${start},${end},${relation_id},${temp1[t]})`;
        var row3 = await person_info.helper(sql1, temp1, start, end, "");
    }
   
    let sql2 = `UPDATE RESTAURANT SET no_of_${a} =${value-1} WHERE id=${number}`;
    var row3 = await person_info.helper(sql2, temp1, start, end, "");
}








//Checks if the restaurant meets all the dietry need of the group
function checkCriteria_two(arr,temp) {
    const result = arr.every(val => temp.includes(val));
    return result;
}


exports.calculator = calculator;