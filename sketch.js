var myoblast = [];
var myosin = []

// myoblast determines rhythm...
// myosin determines melody...

var path = [];

function setup() {
  loadStrings('./fastaSequences/Bos_taurus_MYF5_201_sequence_myoblast.fa', function(res) {
    myoblast = parseCDNA(res, routeNotes);
  });

  // loadStrings('./fastaSequences/Bos_taurus_MYO1G_sequence.fa', function(res) {
  //   myosin = parseCDNA(res);
  // });

  createCanvas(windowWidth, windowHeight);
  stroke(250);
  strokeWeight(2);
}

function draw() {
  background(0);
  // var percentDone = map(scorePos, 0, currentScore.length, 0, width);
  // var heightOfEllipse = map(currentScore[scorePos][1], root, root + 30, height - 100, 100);
  beginShape();
  for (var i in path) {
    curveVertex(path[i][0], path[i][1]);
  }
  endShape();
  // ellipse(percentDone, heightOfEllipse, 30, 50);
}

function parseCDNA(res, callback) {
  var sequence = [];
  var elapsedTime = 0;
  // parse
  for (var i in res) {
    var line = res[i];
    if (line[0] === '>') {
      // title line
    }
    else {
      // for every three, lookup amino acid
      var proteins = line.match(/.{1,3}/g);
      // console.log(proteins);
      for (var j in proteins) {
        if (typeof(aminoAcidMap[proteins[j]]) === 'undefined') {
          console.log('undefined: ' + proteins[j]);
        } else {
          var amino = aminoAcidMap[proteins[j]];

          // if it is a rest... just increment elapsed time
          if (amino[0] === 'REST') {
            elapsedTime = amino[1] / speed + elapsedTime;
          }

          // otherwise it's a letter in the alphabet array corresponding with amino acid...
          else {
            var notePosition = alphabet.indexOf(amino[0]);

            var posInScale = notePosition % currentScale.length;
            var octave = Math.floor( notePosition / currentScale.length );
            var note = currentScale[posInScale] + 12*octave + root;
            var duration = amino[1] / speed;
            elapsedTime = elapsedTime + duration;
            sequence.push([elapsedTime - duration, note, duration]);
          }
        }
      }
    }
  }
  if (typeof(callback) !== 'undefined') {
    callback(sequence);
  }
  return sequence;
}