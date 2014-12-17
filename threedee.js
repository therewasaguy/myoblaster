
var clock = new THREE.Clock();
var delta = clock.getDelta(); // seconds.
var time = 0;
var camera, scene, renderer;

var texture;
var animals = [];
var animalGeo = []; // array of animal geometries
var materials; // array of materials that will start invisible

window.onload = function() {
  init();
  animate();
}

function init() {
  clock.start();
  initShader();
  initEvents();

  // add container to document
  container = document.getElementById( 'three' );
  document.body.appendChild( container );

  // camera
  // camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100);
  camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -10000, 10000 );
  camera.position.z = -10000;

  // scene
  scene = new THREE.Scene();

  var ambient = new THREE.AmbientLight( 0xffbbff );
  scene.add( ambient );

  var directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.position.set( 0, 0, 1 ).normalize();
  scene.add( directionalLight );

  // texture
  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };


  ///////////////////////////////////////// obj1, obj2, obj3
  initAnimals();

  // renderer
  if(Detector.webgl){
    renderer = new THREE.WebGLRenderer();
  } else {
    renderer = new THREE.CanvasRenderer();
  }
  renderer.setSize( window.innerWidth - 200, window.innerHeight );
  renderer.setClearColor(0x222222, 0.01);
  container.appendChild( renderer.domElement );

}

function initAnimals(){
  animals = [];
  animalGeo = [];
  buildingAnimal = false;
  facePos = 0;
}


function animate() {
  updateShaders();
  render();
  requestAnimationFrame( animate );
  time = clock.getElapsedTime();
}

function render() {
  renderer.clear();

  var delta = clock.getDelta();
  customUniforms.time.value += delta;

  updateCamera();
  if (typeof (obj) !== 'undefined') {
    obj.rotation.y += (0.1*(Math.PI / 180));
    obj.rotation.y %=360;
    // center obj
    obj.position.setY(obj.geometry.center().y);
  }
}

////////////// from 3 dreams of black, loads a .js file
function loadGeometry(animalPath, num) {

  var path = './jsModels/' + animalPath + '.js';
  console.log(path);
  var loader = new THREE.JSONLoader();
  THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

  loader.load(path, function(g) {
    g.name = animalPath;
    animalGeo[num] = g;
    loadedGeo(num);
  }, onProgress, onError);
}


var customMaterial, customUniforms;
function initShader() {

  texture = new THREE.ImageUtils.loadTexture('textures/meat1.jpg');
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(1,1);
  texture.needsUpdate = true;

  ////////////
  // CUSTOM //
  ////////////
  
  // base image texture for mesh
  var lavaTexture = new THREE.ImageUtils.loadTexture( 'textures/meat1.jpg');
  lavaTexture.wrapS = lavaTexture.wrapT = THREE.MirroredRepeatWrapping; 
  // multiplier for distortion speed    
  var baseSpeed = 0.02;
  // number of times to repeat texture in each direction
  var repeatS = repeatT = 1.0;
  
  // texture used to generate "randomness", distort all other textures
  var noiseTexture = new THREE.ImageUtils.loadTexture( 'textures/cloud.png');
  noiseTexture.wrapS = noiseTexture.wrapT = THREE.MirroredRepeatWrapping; 
  // magnitude of noise effect
  var noiseScale = 0.01; //.5
  
  // texture to additively blend with base image texture
  var blendTexture = new THREE.ImageUtils.loadTexture( 'textures/meat1.jpg' );
  blendTexture.wrapS = blendTexture.wrapT = THREE.MirroredRepeatWrapping; 
  // multiplier for distortion speed 
  var blendSpeed = 0.01;
  // adjust lightness/darkness of blended texture
  var blendOffset = 0.25;

  // texture to determine normal displacement
  var bumpTexture = noiseTexture;
  bumpTexture.wrapS = bumpTexture.wrapT = THREE.MirroredRepeatWrapping; 
  // multiplier for distortion speed    
  var bumpSpeed   = 0.15;
  // magnitude of normal displacement
  var bumpScale   = 50.0;

  customUniforms = {
    baseTexture:  { type: "t", value: texture },
    baseSpeed:    { type: "f", value: baseSpeed },
    repeatS:    { type: "f", value: repeatS },
    repeatT:    { type: "f", value: repeatT },
    noiseTexture: { type: "t", value: noiseTexture },
    noiseScale:   { type: "f", value: noiseScale },
    blendTexture: { type: "t", value: blendTexture },
    blendSpeed:   { type: "f", value: blendSpeed },
    blendOffset:  { type: "f", value: blendOffset },
    bumpTexture:  { type: "t", value: bumpTexture },
    bumpSpeed:    { type: "f", value: bumpSpeed },
    bumpScale:    { type: "f", value: bumpScale },
    alpha:      { type: "f", value: 1.0 },
    time:       { type: "f", value: 1.0 }
  };

  // create custom material from the shader code above
  //   that is within specially labeled script tags
  customMaterial = new THREE.ShaderMaterial( 
  {
      uniforms: customUniforms,
    vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  }   );
}


var staticMaterial;
var highlightMaterial;

function initAnimal(g) {
  staticMaterial = new THREE.MeshPhongMaterial( { map: texture, color: 0xffffff, side: THREE.DoubleSide, shading: THREE.NoShading, magFilter:THREE.NearestFilter, minFilter:THREE.NearestFilter } )
  highlightMaterial = new THREE.MeshBasicMaterial({color:0xffff00});

  materials = [
    customMaterial,
    staticMaterial
  ];

  for (var i = 0; i < g.faces.length - 1; i++ ){
    materials.push(new THREE.MeshLambertMaterial( { visible: false } ) );
  }

  obj = new THREE.Mesh(g, new THREE.MeshFaceMaterial(materials));
  // make all faces invisible by assigning them to a unique materials index
  for (var i = 0; i < g.faces.length - 1; i++) {
    g.faces[ i ].materialIndex = i; // materialB
  }
  obj.geometry.computeFaceNormals();
  obj.geometry.computeVertexNormals();
  obj.geometry.buffersNeedUpdate = true;
  obj.geometry.uvsNeedUpdate = true;
  obj.geometry.elementsNeedUpdate = true;
  obj.geometry.castShadow = true;
  animals.push(obj);
  scene.add(obj);
}

// exercise meat on mouseClick
var exer = false;
function exerciseMeat() {
  exer = true;
}
function doneExercising() {
  exer = false;
}

function updateShaders() {
  if (exer === true && customUniforms.bumpScale.value < 40.0) {
    var temp = customUniforms.bumpScale.value;
    var val = temp * 1.1;
    customUniforms.bumpScale.value = val;

  } else if (exer === false && customUniforms.bumpScale.value > 1.0){
    var temp = customUniforms.bumpScale.value;
    var val = temp * 0.98;
    customUniforms.bumpScale.value = val;
  }
}

function showNextFace(note) {

  var scaleY = map_range(facePos, 0.2, allFaces.length-1, 0.0, 1.0); //obj.scaleTarget.y);
  var scaleZ = map_range(facePos, 0.2, allFaces.length-1, 0.0, 1.0); //obj.scaleTarget.z);
  obj.scale.set(1.0, scaleY, scaleZ);
  highlightMaterial.color.setHex(noteToColor(note));
  obj.material.materials[facePos + 1] = highlightMaterial;
  obj.material.materials[facePos] = materials[0];
  if (facePos >= allFaces.length -1) {
    buildingAnimal = false;
  } else {
    facePos++;
  }
}


// work on this
function clearAnimal() {
  if (typeof(obj) !== 'undefined') {
    scene.remove(obj);
  }
}

/// generate the hybrid animal
function genGeometry(percentage) {
  if (typeof (obj) !== 'undefined') {
    scene.remove(obj);
    obj = null;
    animals = [];
  }
  var p = 0.4;
  if (typeof (percentage) !== 'undefined') {
    p = percentage;
  } else {
    console.log('percentage was undefined');
  }
  var geometry = animalGeo[0].clone();
  for (var i in animalGeo[0].vertices) {
    var vec = animalGeo[0].vertices[i].lerp(animalGeo[1].vertices[i % animalGeo[1].vertices.length], p);
    geometry.vertices[i] = vec.clone();
  }

  geometry.computeVertexNormals();
  geometry.computeLineDistances();
  geometry.verticesNeedUpdate = true;
  geometry.normalsNeedUpdate = true;
  geometry.buffersNeedUpdate = true;
  geometry.uvsNeedUpdate = true;
  geometry.elementsNeedUpdate = true;
  geometry.castShadow = true;
  geometry.computeFaceNormals();
  geometry.computeTangents();

  genMesh(geometry);
}

function genMesh(g) {
  console.log(g);
  initAnimal(g);
  constructAnimal();
}

var buildingAnimal = false;
var allFaces = [];
var facePos = 0;

function constructAnimal() {
  allFaces = obj.geometry.faces;
  facePos = 0;
  buildingAnimal = true;
}

// HELPERS
var onProgress = function ( xhr ) {
  if ( xhr.lengthComputable ) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};
var onError = function ( xhr ) {
  console.log(xhr);
};

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


/// CAMERA
var minzoomspeed = 0.000015;
var zoomspeed = minzoomspeed;
var zoompos = -10;

function updateCamera() {
  // Put some limits on zooming
  var minzoom = 10;
  var maxzoom = 4000;
  var damping = (Math.abs(zoomspeed) > minzoomspeed ? 0.3 : 1.0);

  // Zoom out faster the further out you go
  var zoom = THREE.Math.clamp(Math.pow(Math.E, zoompos), minzoom, maxzoom);
  zoompos = Math.log(zoom);

  // Slow down quickly at the zoom limits
  if ((zoom == minzoom && zoomspeed < 0) || (zoom == maxzoom && zoomspeed > 0)) {
    damping = .65;
  }

  zoompos += zoomspeed;
  zoomspeed *= damping;

  camera.position.x = Math.sin(.5 * Math.PI * (mouse.x - .5)) * zoom;
  camera.position.y = Math.sin(.25 * Math.PI * (mouse.y - .5)) * zoom - 10.0;
  camera.position.z = Math.cos(.5 * Math.PI * (mouse.x - .5)) * zoom;
  camera.zoom = zoompos ;
  camera.updateProjectionMatrix ();
  // if (typeof (obj) !== 'undefined') {
  //   obj.scale.x =  map_range(obj.scale.x, 0, 1, 0, zoom);
  //   obj.scale.y =  map_range(obj.scale.y, 0, 1, 0, zoom);;
  //   obj.scale.z =  map_range(obj.scale.z, 0, 1, 0, zoom);;
  // }

  camera.lookAt(scene.position);
  renderer.render(scene, camera);

}

function onWindowResize(event) {
  updateRendererSizes();
}

function updateRendererSizes() {

}