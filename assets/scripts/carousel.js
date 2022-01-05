function getOffsets() {
  cont = document.getElementById('carousel');
  const rect = cont.getBoundingClientRect();
  el = carousel_focus;
  const obj = el.getBoundingClientRect();
  return {
    holder_width: rect.width,
    wanted_pos: rect.width/2,
    current_pos: obj.left + window.scrollX + (obj.width/2)
  };
}

function updateFocus(val) {
  focus_numb += val;
  carousel_focus = carousel_images[focus_numb];
}

function getDist(fval) {
  prevDist = prevDist+globDist;
  updateFocus(fval);
  temp = getOffsets();
  globDist = temp.wanted_pos-temp.current_pos;
  carousel_width = temp.holder_width;
}

function quickChange() {
  let newDist = prevDist+globDist;
  for (let obj of carousel_images){
    obj.style.transform = 'translateX('+newDist+'px)';
  }
}

function fluidChange() {
  let newDist = (prevDist+globDist);
  for (let obj of carousel_images){
    obj.style.transitionDuration = '1s';
    obj.style.transform = 'translateX('+newDist+'px)';
  }
}

function full_run()  {
  if (!userChanging){
    getDist(0);
    quickChange();
  }
}

function userChange(val) {
  if (userChanging == true){
    return;
  }
  userChanging = true;
  getDist(val);
  fluidChange();
}

function isVisible(img){
  const objvals = img.getBoundingClientRect();
  let pos = objvals.left + window.scrollX + (objvals.width/2);
  if (pos + (objvals.width/2) <= 0 || pos - (objvals.width/2) >= window.innerWidth){
    return false;
  }else {
    return true;
  }
}

function checkVisibility(){
  for (let obj of carousel_images){
    if (isVisible(obj) == false){
      let currentpos = carousel_images.indexOf(obj);
      if (currentpos == 0){
        console.log('to the left!');
      }else if (currentpos == (carousel_images.length-1)) {
        console.log('to the right!');
        //console.log(obj);
        //obj.after(carousel_images[0]);
      }
    }
  }
}

//===========================================//
const ordering = document.getElementById("carousel").getElementsByTagName("img");
var carousel_images = document.getElementsByClassName('carousel_image');
var inter = [];
var userChanging = false;
var prevDist = 0;
var globDist = 0;
var carousel_width;
for(let i=0; i<carousel_images.length; i++){
  inter.push(carousel_images[i]);
}
var carousel_images=inter;
var focus_numb = 1;
var carousel_focus = carousel_images[1];

function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

var transitionEnd = whichTransitionEvent();
if (carousel_images.length !== 0){
  let tempel = carousel_images[0];
  tempel.addEventListener(transitionEnd, resetter, false);
}
function resetter(){
  for (let obj of carousel_images){
    obj.style.transitionDuration = '0s';
  }
  checkVisibility();
  userChanging = false;
}

setInterval(full_run , 100);
