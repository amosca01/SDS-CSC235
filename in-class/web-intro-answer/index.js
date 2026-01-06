
// Event handler for turn light on button 
function lightOn() {
	document.getElementById('myImage').src='bulbs/pic_bulbon.gif'; 
}

// Event handler for turn light off button
function lightOff() {
	document.getElementById('myImage').src='bulbs/pic_bulboff.gif'; 
}

function mouseOver() {
	document.getElementById("landing").classList.add("highlight"); 
}

function mouseOut() {
	document.getElementById("landing").classList.remove("highlight"); 
}