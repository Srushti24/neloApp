const person_info = require('./person_info');

//helps in filtering out only those retaurants that meets the  dietry criteria of the group
function calculator(preference, restaurant_id, temp, start, end, x,  y) {
    var arr = [];
    var restaurant_criteria = [];
    console.log(preference);
    console.log(restaurant_id);
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
    else if (restaurant_criteria.length == 1) {
        console.log(restaurant_criteria);
    }
    else {
        console.log("bcd");
    }
   
    }
   








//Checks if the restaurant meets all the dietry need of the group
function checkCriteria_two(arr,temp) {
    const result = arr.every(val => temp.includes(val));
    return result;
}


exports.calculator = calculator;