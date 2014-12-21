// var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "Z"];

// by order of hydrophobicity
var alphabet = ["I", "V", "L", "F",
  "C", "M", "A", "G",
  "T", "S", "W", "Y",
  "P", "H", "N", "Q",
  "D", "E", "K", "R"];

// scale ideas https://github.com/uucidl/uu.maxpatches/blob/d7ed61b9a4edc6cb42893d197cd008d9e0f00d0b/patchers/scales.json
// var scales = [
//   [0, 1, 3, 5, 7, 9, 10],
//   [0, 2, 3, 6, 7, 8, 11],
//   [0, 2, 4, 7, 9],
//   [0, 2, 3, 6, 7, 8, 11]
// ];

var scales = {
         'natural major': [0,2,4,5,7,9,11,12],
         'ionian': [0,2,4,5,7,9,11,12],
         'major': [0,2,4,5,7,9,11,12],
         'chromatic': [0,1,2,3,4,5,6,7,8,9,10,11,12],
         'spanish 8 tone': [0,1,3,4,5,6,8,10,12],
         'flamenco': [0,1,3,4,5,7,8,10,12],
         'symmetrical': [0,1,3,4,6,7,9,10,12],
         'inverted diminished': [0,1,3,4,6,7,9,10,12],
         'diminished': [0,2,3,5,6,8,9,11,12],
         'whole tone': [0,2,4,6,8,10,12],
         'augmented': [0,3,4,7,8,11,12],
         '3 semitone': [0,3,6,9,12],
         '4 semitone': [0,4,8,12],
         'locrian ultra': [0,1,3,4,6,8,9,12],
         'locrian super': [0,1,3,4,6,8,10,12],
         'indian': [0,1,3,4,7,8,10,12],
         'locrian': [0,1,3,5,6,8,10,12],
         'phrygian': [0,1,3,5,7,8,10,12],
         'neapolitan minor': [0,1,3,5,7,8,11,12],
         'javanese': [0,1,3,5,7,9,10,12],
         'neapolitan major': [0,1,3,5,7,9,11,12],
         'todi': [0,1,3,6,7,8,11,12],
         'persian': [0,1,4,5,6,8,11,12],
         'oriental': [0,1,4,5,6,9,10,12],
         'phrygian major': [0,1,4,5,7,8,10,12],
         'spanish': [0,1,4,5,7,8,10,12],
         'jewish': [0,1,4,5,7,8,10,12],
         'double harmonic': [0,1,4,5,7,8,11,12],
         'gypsy': [0,1,4,5,7,8,11,12],
         'byzantine': [0,1,4,5,7,8,11,12],
         'chahargah': [0,1,4,5,7,8,11,12],
         'marva': [0,1,4,6,7,9,11,12],
         'enigmatic': [0,1,4,6,8,10,11,12],
         'locrian natural': [0,2,3,5,6,8,10,12],
         'natural minor': [0,2,3,5,7,8,10,12],
         'minor': [0,2,3,5,7,8,10,12],
         'melodic minor': [0,2,3,5,7,9,11,12],
         'aeolian': [0,2,3,5,7,8,10,12],
         'algerian 2': [0,2,3,5,7,8,10,12],
         'hungarian minor': [0,2,3,6,7,8,11,12],
         'algerian': [0,2,3,6,7,8,11,12],
         'algerian 1': [0,2,3,6,7,8,11,12],
         'harmonic minor': [0,2,3,5,7,8,11,12],
         'mohammedan': [0,2,3,5,7,8,11,12],
         'dorian': [0,2,3,5,7,9,10,12],
         'hungarian gypsy': [0,2,3,6,7,8,11,12],
         'romanian': [0,2,3,6,7,9,10,12],
         'locrian major': [0,2,4,5,6,8,10,12],
         'arabian': [0,1,4,5,7,8,11,12],
         'hindu': [0,2,4,5,7,8,10,12],
         'ethiopian': [0,2,4,5,7,8,11,12],
         'mixolydian': [0,2,4,5,7,9,10,12],
         'mixolydian augmented': [0,2,4,5,8,9,10,12],
         'harmonic major': [0,2,4,5,8,9,11,12],
         'lydian minor': [0,2,4,6,7,8,10,12],
         'lydian dominant': [0,2,4,6,7,9,10,12],
         'overtone': [0,2,4,6,7,9,10,12],
         'lydian': [0,2,4,6,7,9,11,12],
         'lydian augmented': [0,2,4,6,8,9,10,12],
         'leading whole tone': [0,2,4,6,8,10,11,12],
         'blues': [0,3,5,6,7,10,12],
         'hungarian major': [0,3,4,6,7,9,10,12],
         'pb': [0,1,3,6,8,12],
         'balinese': [0,1,3,7,8,12],
         'pe': [0,1,3,7,8,12],
         'pelog': [0,1,3,7,10,12],
         'iwato': [0,1,5,6,10,12],
         'japanese': [0,1,5,7,8,12],
         'kumoi': [0,1,5,7,8,12],
         'hirajoshi': [0,2,3,7,8,12],
         'pa': [0,2,3,7,8,12],
         'pd': [0,2,3,7,9,12],
         'pentatonic major': [0,2,4,7,9,12],
         'chinese': [0,2,4,7,9,12],
         'chinese 1': [0,2,4,7,9,12],
         'mongolian': [0,2,4,7,9,12],
         'pfcg': [0,2,4,7,9,12],
         'egyptian': [0,2,3,6,7,8,11,12],
         'pentatonic minor': [0,3,5,7,10,12],
         'chinese 2': [0,4,6,7,11,12],
         'altered': [0,1,3,4,6,8,10,12],
         'bebop dominant': [0,2,4,5,7,9,10,11,12],
         'bebop dominant flatnine': [0,1,4,5,7,9,10,11,12],
         'bebop major': [0,2,4,5,7,8,9,11,12],
         'bebop minor': [0,2,3,5,7,8,9,10,12],
         'bebop tonic minor': [0,2,3,5,7,8,9,11,12]
};

var currentScale = scales['pentatonic major'];

function setScale(e, whichMenu) {
  var whichScale = whichMenu.options[whichMenu.selectedIndex].value;
  currentScale = scales[whichScale];
}

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