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