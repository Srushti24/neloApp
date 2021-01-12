
function calculator(preference, restaurant_id, temp, start, end, members) {
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
   

}





function checkCriteria_two(arr,temp) {
    const result = arr.every(val => temp.includes(val));
    return result;
}


exports.calculator = calculator;