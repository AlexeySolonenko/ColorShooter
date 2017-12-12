// IMPORT COMMONJS MODULES FOR BROWSERIFY TO BUNDLE THEM
// LATER
var state = require('./state.js');
var animStyle = require('./animStyle'); // apply 
var u = require('./utils.js');
var conf = require('./configs.js');
var updateButton = require('./updateButton.js');
var handleQuery = require('./handleQuery');

// get DOM elements by their IDs 
var btn1 = document.getElementById('btn1');
var msgBox = document.getElementById('msgbox');
var frame1 = document.getElementById('frame1');



// setup request to server and the callback
var reqForColor = new XMLHttpRequest();
reqForColor.addEventListener("load", function(e){updateButton(e.target.responseText,btn1,msgBox,state,u.randColorInd, animStyle, frame1)})

// setup button onlclick handler
btn1.onclick = function(){handleQuery(conf.colorServUrl, conf.colorJsonReq, reqForColor, msgBox, btn1, state)};

// initial server query 
document.onreadystatechange = function () { 
    if(document.readyState === 'complete'){
        handleQuery(conf.colorServUrl, conf.colorJsonReq, reqForColor, msgBox, btn1, state);
    };
    return;
};

