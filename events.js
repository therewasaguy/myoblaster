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

  // resize screen
  window.onresize = function(e) {
    console.log(e);
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    var padding = 5;
    var w = windowWidth - 200 - padding;
    var h = windowHeight - padding;
    // resize container, then resize p5 canvas, then reside three.js renderer
    container.setAttribute("style","width:"+w+"; height:"+h);
    three.setAttribute("style","width:"+w+"; height:"+h);
    resizeCanvas(w - 5, h);
    renderer.setSize( w, h);
  }
}

// function onWindowResize() {
//   console.log('resize!');

// }

function onDocumentMouseMove(event) {

  mouse.x = ( event.clientX / window.innerWidth ) * 2; // * 10;
  mouse.y = ( event.clientY / window.innerHeight ) * 2; //* 10;
}



function onMouseWheel(ev) {
  ev.preventDefault();
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