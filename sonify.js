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

var cheb = new Tone.Chebyshev();
delay.connect(cheb);
cheb.setOrder(12);
cheb.setDry(1);
cheb.toMaster();

function updateCheb(){
  if (typeof(customUniforms) !== 'undefined'){
    var dryness = map(customUniforms.bumpScale.value, 1, 40, 1, 0);
    cheb.setDry(dryness, 0.2);
  }
}

function updateTempo(t){
  Tone.Transport.setBpm(t);
}


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

  // show next face of animal every note
  if (buildingAnimal) {
    showNextFace();
    showNextFace(note);
  }
  console.log('bang');
  // schedule next note
  var deltaTime = (currentScore[scorePos + 1][0] - currentScore[scorePos][0] ) * 120 / Tone.Transport.getBpm();
  Tone.Transport.setTimeout(notePlucked, deltaTime);
}

function playMusic() {
  loading = true;
  console.log('play!');
  // routeNotes(noteSeq[0]);
  Tone.Transport.stop();
  Tone.Transport.setTimeout(notePlucked, 1);
  currentScore = noteSeq[0];
  scorePos = 0;
  Tone.Transport.start();
}