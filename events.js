/// MOUSE
var mouse = {'x':0, 'y':0};

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var r = 0.0;

function initEvents() {
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'mousewheel', onMouseWheel, false );
  window.addEventListener( 'DOMMouseScroll', onMouseWheel, false );
  var clickCanvas = document.getElementById('defaultCanvas');
  clickCanvas.addEventListener('mousedown', onMouseDown, false);
  clickCanvas.addEventListener('mouseup', onMouseUp, false);

}

function onDocumentMouseMove(event) {

  mouse.x = ( event.clientX / window.innerWidth ) * 2; // * 10;
  mouse.y = ( event.clientY / window.innerHeight ) * 2; //* 10;
}



function onMouseWheel(ev) {
  var amount = -ev.wheelDeltaY || ev.detail;
  var dir = amount / Math.abs(amount);
  zoomspeed = dir/5;

  // Slow down default zoom speed after user starts zooming, to give them more control
  minzoomspeed = 0.001;
}


function onMouseDown(e) {
  // console.log(e);
  exerciseMeat();
}

function onMouseUp(e) {
  // console.log(e);
  doneExercising();
  console.log('done!');

}