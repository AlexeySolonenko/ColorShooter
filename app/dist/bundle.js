(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var state = require('./state.js');



/*
var state = {}; // storing states 
state.waitingReply = false;
state.waitingAnim = false;
state.step = 0;
state.pos = [
    [0,0],
    [0,350],
    [150,350],
    [150,0]
];
*/


// aliasize elements
let btn1 = document.getElementById('btn1');
let msgBox = document.getElementById('msgbox');

// declare utils variables and funcs

// MDN provided function to properly handle randoms
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


// let's keep MDN code intact and utilize our own util function
  function randColorInd() {
      return getRandomInt(0,6);
  }

function reqListener () {
    let res = JSON.parse(this.responseText);
    let color = res.result.random.data[randColorInd()];
    console.log(color);
    state.waitingReply = false;
    btn1.removeAttribute('disabled');
    msgBox.textContent="New color is: "+color;
    state.step++;
    if(state.step>3) state.step = 0;
    btn1.style.top = state.pos[state.step][0]+'px';
    btn1.style.left = state.pos[state.step][1]+'px';
    btn1.style.backgroundColor = '#'+color;
    console.log(btn1.style.borderColor);
}
  

var reqForColor = new XMLHttpRequest();
reqForColor.addEventListener("load", reqListener);


document.getElementById('btn1').onclick = function () {
    //reqForColor.open("GET", "http://www.colr.org/json/colors/random/7"); 
    reqForColor.open("POST","https://api.random.org/json-rpc/1/invoke");
    let req = JSON.stringify({"jsonrpc":"2.0","method":"generateIntegers","params":{"apiKey":"00000000-0000-0000-0000-000000000000","n":10,"min":1,"max":16777215,"replacement":true,"base":16},"id":12830});
    reqForColor.send(req);
    console.log(req);
    state.waitingReply = true;
    document.getElementById('msgbox').textContent="Please, wait. Server is being queried. Button is blocked";
    document.getElementById('btn1').setAttribute('disabled','true');
}


},{"./state.js":2}],2:[function(require,module,exports){
module.exports = {
waitingReply : false,
waitingAnim : false,
step : 0,
pos : [
    [0,0],
    [0,350],
    [150,350],
    [150,0]
]};
},{}]},{},[1]);
