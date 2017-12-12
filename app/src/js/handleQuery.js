module.exports = function(url, json, httpReqObj, msgBox, btn, state){
    httpReqObj.open("POST",url);
    success = true;
    var req = JSON.stringify(json);
    httpReqObj.send(req);
    state.serverAwaited = true;
    if(!state.initRequest){
        msgBox.textContent="Please, wait. Server is being queried. Content being loaded.";
    } else {
        msgBox.textContent="Please, wait. Server is being queried. Button is blocked";
    }
    btn.setAttribute('disabled','true');
    function startNoResponseTimeout(btn, msgBox, state) {
        function resetServerAwaited(){
        btn.removeAttribute('disabled');
        msgBox.textContent="Server has not replied within 5 seconds. System has been reset.";
        state.serverAwaited = false;
        }
        state.noResponseTimeout = setTimeout(resetServerAwaited, 5000);
    };

    startNoResponseTimeout(btn, msgBox, state);
};