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