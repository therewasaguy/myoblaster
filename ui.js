var theMenu;

function setupTheMenu() {

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

  theMenu.onchange = function(e) {selectCell(e)};
  // document.body.appendChild(theMenu);
  var dropdownDiv = document.getElementById('dropdown');
  dropdownDiv.appendChild(theMenu);
}


var comestibles = {
  ":: Mammals" : ["Bear", "Bison", "Boar", "Caribou", "Cattle", "Elephant", "Horse", "Kangaroo", "Pig", "Rabbit", "Sheep", "Squirrel"],
  ":: Birds" : ["Chicken", "Duck", "Ostrich", "Turkey"],
  ":: Reptiles" : ["Turtle", "Snake"],
  ":: Fish" : ["Cod", "Herring", "Salmon", "Tilapia"]
}