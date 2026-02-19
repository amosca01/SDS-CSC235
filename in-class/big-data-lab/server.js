//https://www.geeksforgeeks.org/web-tech/introduction-to-express/ 

const express = require('express'); 
const app = express();
const PORT = 8000; 

// serve from the public dirctory 
app.use(express.static('public')); 

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server running, App listening on port " + PORT); 
    } else {
        console.log("Error occured: " + error); 
    }
    
});