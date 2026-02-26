
// print data to console 

d3.json("miserables.json")
    .then(function(data){
        console.log(data); 
    }); 