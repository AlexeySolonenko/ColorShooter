

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
    let color = res.colors[randColorInd()];
    console.log(color);
    state.waitingReply = false;
    btn1.removeAttribute('disabled');
    msgBox.textContent="New color is: "+color.tags[0].name;
    state.step++;
    if(state.step>3) state.step = 0;
    btn1.style.top = state.pos[state.step][0]+'px';
    btn1.style.left = state.pos[state.step][1]+'px';
    btn1.style.backgroundColor = '#'+color.hex;
    console.log(btn1.style.borderColor);
}
  

var reqForColor = new XMLHttpRequest();
reqForColor.addEventListener("load", reqListener);


document.getElementById('btn1').onclick = function () {
    reqForColor.open("GET", "http://www.colr.org/json/colors/random/7"); 
    reqForColor.send();
    state.waitingReply = true;
    document.getElementById('msgbox').textContent="Please, wait. Server is being queried. Button is blocked";
    document.getElementById('btn1').setAttribute('disabled','true');
}

if(state.waitingReply) {

}