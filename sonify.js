var speed = 10;

var root = 30;

var currentScore = [];
var scorePos = 0;

// var synth = new Tone.PolySynth(5, Tone.PluckSynth);
var synth1 = new Tone.FMSynth();
var synth2 = new Tone.PluckSynth();
var phaser = new Tone.Phaser();
var delay = new Tone.FeedbackDelay();
synth1.connect(phaser);
synth2.connect(delay);
phaser.connect(delay);
delay.dryWet.setWet(.05);
delay.toMaster();

function routeNotes(sequence) {
  var myScore = {
    "synth" : sequence
  };
  Tone.Note.parseScore(myScore);

  Tone.Transport.start();
  currentScore = sequence;
  scorePos = 0;
}


Tone.Note.route("synth", function(time, note, duration){
  Tone.Transport.setTimeline(notePlucked, time, canvas.getContext('2d') );
});

// draw something when a note is plucked (called by Tone.Transport)
function notePlucked(e) {
  loading = false;
  var noteChunk = currentScore[scorePos];
  var note = noteChunk[1];
  var duration = noteChunk[2];

  var percentDone = map(scorePos, 0, currentScore.length, 0, width);
  var heightOfEllipse = map(noteChunk[1], root, root + 40, height - 100, 100);
  path.push([percentDone, heightOfEllipse]);
  if (scorePos >= currentScore.length - 1) {
    Tone.Transport.stop(e);
    Tone.Transport.clearTimelines();
    Tone.Transport.clearTimeouts();
    scorePos = 0;
  } else {
    scorePos++;
  }

  synth1.triggerAttackRelease(synth1.midiToNote(note), duration, e);
  synth2.triggerAttackRelease(synth1.midiToNote(note), duration, e);


}