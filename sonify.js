var speed = 10;
var beatDuration = 2;
var root = 30;

var currentScore = [];
var scorePos = 0;

// var synth = new Tone.PolySynth(5, Tone.PluckSynth);
var synth1 = new Tone.FMSynth();
var synth2 = new Tone.DuoSynth();

synth2.setPreset('Organ');
synth2.setVolume(-12);
synth1.setPreset('myBell');
// synth1._modulationIndex.setValue(16);
// synth1._harmonicity.setValue(10);
// synth1.modulator.oscillator.setType('sine');
// synth1.carrier.oscillator.setType('sine');
// synth1.carrier.filter.setType('lowpass');
// synth1.carrier.filter.setFrequency(2600);
// synth1.carrier.filter.setQ(12);
// synth1.carrier.filterEnvelope.min = 200;
// synth1.carrier.filterEnvelope.max = 1400;
// synth1.carrier.filterEnvelope.decay = 0.03;
// synth1.carrier.filterEnvelope.attack = 0.03;
// synth1.modulator.filterEnvelope.min = 1;
// synth1.modulator.filterEnvelope.max = 1000;
// synth1.modulator.filterEnvelope.decay = 0.4;
// synth1.modulator.filterEnvelope.attack = 0.03;
// synth1.modulator.envelope.sustain = 0.01;
// synth1.modulator.envelope.decay = 0.5;
// synth1.modulator.envelope.attack = 0.004;

var lowPass = new Tone.Filter('lowpass');
lowPass.setFrequency(1600);
lowPass.setRolloff(-48);
var phaser = new Tone.Phaser();
var delay = new Tone.FeedbackDelay();

synth1.connect(lowPass);
lowPass.connect(phaser);
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
  Tone.Transport.setTimeline(notePlucked, time);
});


// draw something when a note is plucked (called by Tone.Transport)
function notePlucked(e) {

  loading = false;
  var noteChunk = currentScore[scorePos];
  var note = noteChunk[1];
  var duration = noteChunk[2];

  var percentDone = map(scorePos, 0, currentScore.length, 0, width);
  var heightOfEllipse = map(noteChunk[1], root, root + 12 * Math.floor( alphabet.length / currentScale.length ), height - 100, 100);
  path.push([percentDone, heightOfEllipse]);
  if (scorePos >= currentScore.length - 1) {
    Tone.Transport.stop(e);
    Tone.Transport.clearTimelines();
    Tone.Transport.clearTimeouts();
    scorePos = 0;
  } else {
    scorePos++;
  }

  if (note > 60) {
    synth2.triggerAttackRelease(synth1.midiToNote(note), duration, e);
  } else {
    synth1.triggerAttackRelease(synth1.midiToNote(note), duration, e);
  }

}