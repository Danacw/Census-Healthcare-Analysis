////// STEP 1: Load data from csv //////
var data = d3.csv("../data/data.csv").then(function(data){
    console.log(data)
});

// var data = d3.csv("data/data.csv").then((data) => {
//     console.log(data)
// });

