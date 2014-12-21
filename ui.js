var theMenu, otherMenu, goButton, tempoSlider, tempoOutput;

function setupTheMenu() {

  // MENU 1
  theMenu = document.createElement('SELECT');
  theMenu.id = 'theMenu';

  for (var i in comestibles) {
    // create optgroup
    var optg = document.createElement('optgroup');
    optg.label = i;
    theMenu.add(optg);
    for (var j in comestibles[i]){
      var option = document.createElement('option');
      option.text = comestibles[i][j];
      theMenu.add(option);
    }
  }

  theMenu.onchange = function(e) {
    selectCell(e, 0, theMenu)
  };
  // document.body.appendChild(theMenu);
  var dropdownDiv = document.getElementById('dropdown1');
  dropdownDiv.appendChild(theMenu);


  // MENU 2
  otherMenu = document.createElement('SELECT');
  otherMenu.id = 'theMenu';

  for (var i in comestibles) {
    // create optgroup
    var optg = document.createElement('optgroup');
    optg.label = i;
    otherMenu.add(optg);
    for (var j in comestibles[i]){
      var option = document.createElement('option');
      option.text = comestibles[i][j];
      otherMenu.add(option);
    }
  }

  otherMenu.onchange = function(e) {
    selectCell(e, 1, otherMenu)
  };
  // document.body.appendChild(theMenu);
  var dropdownDiv = document.getElementById('dropdown2');
  dropdownDiv.appendChild(otherMenu);

  // BUTTON
  goButton = document.createElement("INPUT");
  goButton.setAttribute("type", "button");
  goButton.setAttribute("value", "Generate");
  goButton.setAttribute("text-size", "1000");
  goButton.disabled = true;
  goButton.className = 'disabled';
  var thediv = document.getElementById('button');
  thediv.appendChild(goButton);
  goButton.onclick = function(e) {
    playMusic();
    genGeometry();
  }

  // SLIDERS
  tempoSlider = document.createElement("INPUT");
  tempoSlider.setAttribute("type", "range");
  tempoSlider.setAttribute("min", "20");
  tempoSlider.setAttribute("max", "500");
  tempoSlider.setAttribute("id", "tempoSlider");
  tempoSlider.oninput = function(e) {
    document.querySelector('#tempoOut').value = 'Speed: ' + e.target.value;
    updateTempo(e.target.value);
  }
  var thediv = document.getElementById('tempo');
  thediv.appendChild(tempoSlider);
  var br = document.createElement('br')
  thediv.appendChild(br);

  // SLIDER OUTPUT
  tempoOutput = document.createElement("OUTPUT");
  tempoOutput.setAttribute('for', tempoSlider);
  tempoOutput.setAttribute('id', 'tempoOut');
  tempoOutput.setAttribute('width', '300');
  tempoOutput.setAttribute('width', '300');
  thediv.appendChild(tempoOutput);


  // ANIMAL SLIDER
  ratioSlider = document.createElement("INPUT");
  ratioSlider.setAttribute("type", "range");
  ratioSlider.setAttribute("min", "0");
  ratioSlider.setAttribute("max", "100");
  ratioSlider.setAttribute("id", "tempoSlider");
  ratioSlider.oninput = function(e) {
    document.querySelector('#ratioOut').value = 'Animal Ratio: ' + e.target.value + "%";
    updateRatio((100 - e.target.value) / 100);
  }
  var thediv = document.getElementById('tempo');
  thediv.appendChild(ratioSlider);
  var br = document.createElement('br')
  thediv.appendChild(br);

  // SLIDER OUTPUT
  ratioOutput = document.createElement("OUTPUT");
  ratioOutput.setAttribute('for', ratioSlider);
  ratioOutput.setAttribute('id', 'ratioOut');
  ratioOutput.setAttribute('width', '300');
  ratioOutput.setAttribute('width', '300');
  thediv.appendChild(ratioOutput);


  // SCALE SLIDER
  var scaleLabel = document.createElement("p");
  scaleLabel.innerHTML = 'Musical Scale: '
  thediv.appendChild(scaleLabel);

  scaleMenu = document.createElement('SELECT');
  scaleMenu.id = 'scaleMenu';

  for (var i in scales) {
    var option = document.createElement('option');
    option.text = i;
    scaleMenu.add(option);
  }

  scaleMenu.onchange = function(e) {
    setScale(e.target.value, scaleMenu);
  };
  thediv.appendChild(scaleMenu);

  initBpmSlider();
}

function initBpmSlider() {
  tempoSlider.setAttribute("value", "120");
  tempoOutput.innerHTML = 'Speed: ' + 120;
  ratioSlider.setAttribute("value", "60");
  ratioOutput.innerHTML = 'Animal Ratio: ' + 60 + "%";
}

function enableButton() {
  goButton.disabled = false;
  goButton.className = 'enabled';

}


// FULL SCREEn
addEventListener("click", function() {
    var
          el = document.documentElement
        , rfs =
               el.requestFullScreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
    ;
    rfs.call(el);
});



var comestibles = {
  ":: Mammals" : ["Bear", "Bison", "Boar", "Caribou", "Cattle", "Horse", "Pig", "Rabbit"],
  ":: Fish" : ["Cod", "Herring", "Salmon", "Tilapia"]
}

// ":: Birds" : ["Chicken", "Duck", "Ostrich", "Turkey"],
// "Elephant", "Kangaroo","Squirrel"
//   ":: Reptiles" : ["Turtle", "Snake"],

// sheep is a goat, needs fixin

// have models add DNA: Moose, gator, fox, frog, Deer, Crab, 
var dna2models = {
  "Bear" : "bear",
  "Bison" : "bison",
  "Boar" : "chowchow",
  "Caribou" : "elk",
  "Cattle" : "cow",
  "Deer" : "deer",
  "Horse" : "horse",
  "Rabbit" : "rabbit",
  "Sheep" : "goat",
  "Pig" : "chowchow",
  "Cod" : "fish1",
  "Herring" : "fish3",
  "Salmon" : "fish3",
  "Tilapia" : "fish4"
}