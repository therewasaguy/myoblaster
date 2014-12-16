var theMenu, otherMenu, goButton;

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
    selectCell(e, 0)
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
    selectCell(e, 1)
  };
  // document.body.appendChild(theMenu);
  var dropdownDiv = document.getElementById('dropdown2');
  dropdownDiv.appendChild(otherMenu);

  // BUTTON
  goButton = document.createElement("INPUT");
  goButton.setAttribute("type", "button");
  goButton.setAttribute("value", "Generate");
  goButton.setAttribute("text-size", "1000");
  var thediv = document.getElementById('button');
  thediv.appendChild(goButton);
  goButton.onclick = function(e) {
    console.log(e);
    playMusic();
    genGeometry(0.3);
  }

}


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