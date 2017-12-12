(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* FUNCTION THAT AVERTS BALL'S STYLE ACCORDING TO NEW COLOR */
/* THE FUNCTION RETURNS A STYLE-STRING THAT DEFINES A ROTATIONAL ANIMATION 
AND GRADIENT */

module.exports = function(color){
    return "background-image: -moz-radial-gradient(15px 25px 45deg, circle cover, yellow 0%, white 100%, #"+color+"95%);"+
        "background-image: -webkit-radial-gradient(15px 25px, circle cover, white, #"+color+");"+
        "background-image: radial-gradient(15px 25px 45deg, circle cover, yellow 0%, white 100%, #"+color+" 95%);"+
        "animation-name: spin; "+
        "animation-duration: 3s;"+
        "animation-iteration-count: infinite;"+ 
        "animation-timing-function: linear;";
};  
},{}],2:[function(require,module,exports){
module.exports = {
    colorServUrl: 'https://api.random.org/json-rpc/1/invoke',
    colorJsonReq: {"jsonrpc":"2.0","method":"generateIntegers","params":{"apiKey":"00000000-0000-0000-0000-000000000000","n":10,"min":1,"max":16777215,"replacement":true,"base":16},"id":12830}

};
},{}],3:[function(require,module,exports){
module.exports = function(url, json, httpReqObj, msgBox, btn){
    httpReqObj.open("POST",url);
    var req = JSON.stringify(json);
    httpReqObj.send(req);
    msgBox.textContent="Please, wait. Server is being queried. Button is blocked";
    btn.setAttribute('disabled','true');
};
},{}],4:[function(require,module,exports){
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
reqForColor.addEventListener("load", function(res){updateButton(res,btn1,msgBox,state)})

// setup button onlclick handler
btn1.onclick = handleQuery(conf.colorServUrl, conf.colorJsonReq, reqForColor, msgBox, btn1);

// initial server query 

document.onreadystatechange = function () { 
    if(document.readyState === 'complete'){
        console.log('hi');
        alert('hi');
        handleQuery(conf.colorServUrl, conf.colorJsonReq, reqForColor, msgBox, btn1);
    };
};

window.onload = function(){
    console.log('hi');
}

document.addEventListener("DOMContentLoaded", function(event){console.log(('hi'));});
},{"./animStyle":1,"./configs.js":2,"./handleQuery":3,"./state.js":5,"./updateButton.js":6,"./utils.js":7}],5:[function(require,module,exports){
module.exports = {
serverAwaited: false,
initRequest: false,
step : 3,
pos : [
    [0,0],
    [0,350],
    [150,350],
    [150,0]
]};
},{}],6:[function(require,module,exports){
module.exports = function(res, btn, msgBox, state){
    var res = JSON.parse(res);
    var color = res.result.random.data[u.randColorInd()];
    btn.removeAttribute('disabled');
    msgBox.textContent="New color is: "+color;
    btn.style.cssText += animStyle(color);
    //var step = state.step;
    if(state.step>3) { state.step = 0;};
    btn.style.top = state.pos[state.step][0]+'px';
    btn.style.left = state.pos[state.step][1]+'px';
    btn.style.backgroundColor = '#'+color;
}
},{}],7:[function(require,module,exports){
module.exports = {
    getRandomInt: function(min, max) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      },
    randColorInd: function() {
        return this.getRandomInt(0,6);
    }
};
},{}]},{},[4]);
