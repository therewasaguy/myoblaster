var myoblast = [];

/**
 *  Myoblast generates music from embryonic DNA
 *
 *  Myoblasts are a type of embryonic cell called a progenitor. Like a stem cell, they are undifferentiated simple cells.
 *  Signals created within the cell indicate what types of genes it might produce. Myoblasts are more specialized than
 *  regular stem cells—they typically generate muscle cells, or Myosin.
 *
 *  Select Your Meat.
 *
 *  In a future iteration, maybe the myoblast can determines rhythm,
 *  while the output myosin determines melody...
 */

var path = [];

var cnv;
var leftPadding = 210;
var topPadding = 0;

function setup() {
  cnv = createCanvas(windowWidth - leftPadding, windowHeight - topPadding);
  cnv.position(leftPadding, topPadding);

  stroke(250);
  strokeWeight(2);
  textSize(48);
  frameRate(60);
  fill(255, 100, 100);
  textAlign(CENTER);
  //UI
  setupTheMenu();
}

function draw() {
  background(0);
  fill(255, 0, 0);
  // var percentDone = map(scorePos, 0, currentScore.length, 0, width);
  // var heightOfEllipse = map(currentScore[scorePos][1], root, root + 30, height - 100, 100);
  beginShape();
  for (var i in path) {
    curveVertex(path[i][0], path[i][1]);
  }

  if (path.length > 1) {
    vertex(path[path.length - 1][0], path[path.length - 1][1]);
    noStroke();
    ellipse(path[path.length - 1][0], path[path.length - 1][1], 30, 50);
  }
  endShape();

  if (loading) {
    doLoading();
  }

}


var loading = false;

function doLoading() {
  text("Loading DNA Sequence...", width/2, height/2);
}

function parseCDNA(res, callback) {
  var sequence = [];
  var elapsedTime = 0;

  var previousNote = 0;

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
          // rest
          elapsedTime = 1/speed + elapsedTime;
        }
        else {
          var amino = aminoAcidMap[proteins[j]];
          // if it is a rest... just increment elapsed time
          if (amino[0] === 'REST') {
            // elapsedTime = amino[1] / speed + elapsedTime;
            elapsedTime = beatDuration / speed + elapsedTime;
          }

          // otherwise it's a letter in the alphabet array corresponding with amino acid...
          else {
            var notePosition = alphabet.indexOf(amino[0]);

            var posInScale = notePosition % currentScale.length;
            var octave = Math.floor( notePosition / currentScale.length );
            var note = currentScale[posInScale] + 12*octave + root;
            // var duration = amino[1] / speed;
            var duration = beatDuration / speed;
            elapsedTime = elapsedTime + duration;

            if (note !== previousNote){
              sequence.push([elapsedTime - duration, note, duration]);
            } else {
              // add to previous note's duration
              sequence[sequence.length - 1][2] += duration;
              console.log(sequence[sequence.length - 1][2]);
            }
            previousNote = note;
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

// restart the drawing and Transport
function reset() {
  Tone.Transport.stop();
  path = [];
  scorePos = 0;
}

function selectCell(e) {
  reset();

  loading = true;

  var animal = theMenu.options[theMenu.selectedIndex].value;

  loadStrings('./fastaSequences/'+animal, function(res) {
    myoblast = parseCDNA(res, routeNotes);
  });
}