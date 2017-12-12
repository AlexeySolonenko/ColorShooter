module.exports = function(res, btn, msgBox, state, findColor, animStyle, frame1){

    var res = JSON.parse(res);
    var color = res.result.random.data[findColor()];
    btn.removeAttribute('disabled');
    msgBox.textContent="New color is: "+color;
    btn.style.cssText += animStyle(color);
    state.step++;
    state.serverAwaited = false;
    clearTimeout(state.noResponseTimeout);
    if(!state.initRequest){
        btn.style.visibility = 'visible';
        frame1.style.visibility = 'visible';
    }
    if(state.step>3) { state.step = 0;};
    btn.style.top = state.pos[state.step][0]+'px';
    btn.style.left = state.pos[state.step][1]+'px';
    console.log(btn.style.top);
    btn.style.backgroundColor = '#'+color;
}