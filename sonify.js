var speed = 50;

var root = 30;

var currentScore = [];
var scorePos = 0;

var synth = new Tone.PolySynth(2, Tone.FMSynth);
var delay = new Tone.FeedbackDelay();
synth.connect(delay);
delay.toMaster();

function routeNotes(sequence) {
  var myScore = {
    "synth" : sequence
  };
  Tone.Note.parseScore(myScore);

  // Tone.Transport.setBpm(1000);
  Tone.Transport.start();
  currentScore = sequence;
}


Tone.Note.route("synth", function(time, note, duration){
  synth.triggerAttackRelease(synth.midiToNote(note), duration, time);
  Tone.Transport.setTimeline(notePlucked, time, canvas.getContext('2d') );
});

// function cueTheMusic(sequence) {
//   // Tone.Transport.stop();
//   // Tone.Transport.setBpm(100);

//   var myScore = {
//     "synth" : sequence
//   };
//   Tone.Note.parseScore(myScore);

//   // Tone.Transport.start();
//   // Tone.Transport.setBpm(1000);
//   console.log('sup');
// }

function notePlucked(e) {
  var percentDone = map(scorePos, 0, currentScore.length, 0, width);
  var heightOfEllipse = map(currentScore[scorePos][1], root, root + 40, height - 100, 100);
  path.push([percentDone, heightOfEllipse]);
  scorePos++;
}