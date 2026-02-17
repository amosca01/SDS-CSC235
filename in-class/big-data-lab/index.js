// Filename - index.js 

// Set express as Node.js web application
// server framework.

const express = require('express');
const app = express();

// Set EJS as templating engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

	console.log("here"); 

    // The render method takes the name of the HTML
    // page to be rendered as input
    // This page should be in the views folder
    // in the root directory.
    res.render('home');

});

const server = app.listen(8000, () => {
	console.log("listening on port 8000");
});