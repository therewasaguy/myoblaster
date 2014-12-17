// var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "Z"];

// by order of hydrophobicity
var alphabet = ["I", "V", "L", "F",
  "C", "M", "A", "G",
  "T", "S", "W", "Y",
  "P", "H", "N", "Q",
  "D", "E", "K", "R"];

// scale ideas https://github.com/uucidl/uu.maxpatches/blob/d7ed61b9a4edc6cb42893d197cd008d9e0f00d0b/patchers/scales.json
var scales = [
  [0, 1, 3, 5, 7, 9, 10],
  [0, 2, 3, 6, 7, 8, 11],
  [0, 2, 4, 7, 9],
  [0, 2, 3, 6, 7, 8, 11]
];

var currentScale = scales[2];


var noteToColor = function(note) {
  var n = Math.abs((note - root) % 12);
  switch(n){
    case currentScale[0]:
      return '0xd10000';
    case currentScale[1]:
      return '0xff6622';
    case currentScale[2]:
      return '0xffda21';
    case currentScale[3]:
      return '0x33dd00';
    case currentScale[4]:
      return '0x1133cc';
    case currentScale[5]:
      return '0x220066';
    case currentScale[6]:
      return '0x330044';
    default:
      return '0xffda21';
  }
}