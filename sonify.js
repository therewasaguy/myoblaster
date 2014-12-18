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

// DRUM STUFF
var rverb = new Tone.Freeverb();
rverb.setDampening(0.02);
rverb.setDry(0.7);
rverb.setRoomSize(0.6);

var drumFilter = new Tone.Filter('peaking');
drumFilter.setFrequency(1500);

var chorus = new Tone.Chorus(0.1, .2, 0.9);

var drumDelay = new Tone.FeedbackDelay();
drumDelay.setDelayTime('16n');
drumDelay.setFeedback(0.32);

drumFilter.connect(drumDelay);
drumDelay.connect(rverb);
rverb.connect(chorus);
chorus.toMaster();

var cheb = new Tone.Chebyshev();
delay.connect(cheb);
cheb.setOrder(24);
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

  // figure out which MIDI value based on currentScale, which could change
  var notePosition = noteChunk[1];
  var posInScale = notePosition % currentScale.length;
  var octave = Math.floor( notePosition / currentScale.length );
  var note = currentScale[posInScale] + 12*octave + root;

  var duration = noteChunk[2];

  var percentDone = map(scorePos, 0, currentScore.length, 0, width);

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

  // schedule next note (if there is a next note)
  if (typeof(currentScore[scorePos + 1]) !== 'undefined') {
    var deltaTime = (currentScore[scorePos + 1][0] - currentScore[scorePos][0] ) * 120 / Tone.Transport.getBpm();
    Tone.Transport.setTimeout(notePlucked, deltaTime);
  }
}


function drumHit(e) {
  loading = false;
  var noteChunk = drumScore[scorePos];
  var drum = noteChunk[1];
  var notePosition = noteChunk[1];
  if (drumPos >= drumScore.length - 1) {
    drumPos = 0;;
  } else{
    drumPos ++;
  }

  var whichDrum = Math.round( map_range(drum, 0, alphabet.length, 0, drumCount) );
  drums.triggerAttack(whichDrum);

  // schedule next note (if there is a next note)
  if (typeof(drumScore[drumPos + 1]) !== 'undefined') {
    var deltaTime = (drumScore[drumPos + 1][0] - drumScore[drumPos][0] ) * 120 / Tone.Transport.getBpm();
    Tone.Transport.setTimeout(drumHit, deltaTime);
  }
}


function playMusic() {
  loading = true;

  // init
  Tone.Transport.stop();
  currentScore = noteSeq[0];
  scorePos = 0;

  drumScore = noteSeq[1];
  drumPos = 0;

  // schedule first note
  Tone.Transport.setTimeout(notePlucked, 1);
  Tone.Transport.setTimeout(drumHit, 1);

  Tone.Transport.start();
}

var exPlayer = new Tone.Player('./audio/eatMeat.wav', eatLoaded);

function eatLoaded() {
  exPlayer.toMaster();
  exPlayer.setVolume(-140);
  exPlayer.loop = true;
  exPlayer.start(0);
  exPlayer.setPlaybackRate(0.5);
}


function exMusicOn() {
  if (typeof(obj) !== 'undefined'){
    exPlayer.setVolume(3, 3);
  }
}

function exMusicOff() {
  if (typeof(obj) !== 'undefined'){
    exPlayer.setVolume(-140, 10);
  }
}


// drums 
var drumCount = 8;
var drums = new Tone.MultiSampler({
     0 : "./audio/drum1.wav",
     // 1 : "./audio/drum2.wav",
     // 2 : "./audio/drum3.wav",

     // 3 : "./audio/tom4.wav",
     // 4 : "./audio/tom2.wav",
     // 5 : "./audio/tom1.wav",

     1 : "./audio/drum4.wav",
     2 : "./audio/drum5.wav",
     3 : "./audio/drum6.wav",
     4 : "./audio/drum7.wav",
     5 : "./audio/drum8.wav",
 }, drumsLoaded);

function drumsLoaded() {
  drums.connect(drumFilter);
  drums.setVolume(-12);
}
