var myoblast = [];
var myosin = []

function setup() {
  loadStrings('./fastaSequences/Bos_taurus_MYF5_201_sequence_myoblast.fa', function(res) {
    myoblast = parseCDNA(res);
  });

  loadStrings('./fastaSequences/Bos_taurus_MYO1G_sequence.fa', function(res) {
    myosin = parseCDNA(res);
  });
}

function draw() {
  
}

function parseCDNA(res) {
  var sequence = [];

  // parse
  for (var i in res) {
    var line = res[i];
    if (line[0] === '>') {
      // console.log(line);
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
          var notePosition = alphabet.indexOf(amino[0]);

          var posInScale = notePosition % currentScale.length;
          var octave = Math.floor( notePosition / currentScale.length );
          var note = currentScale[posInScale] + 12*octave + root;
          var duration = amino[1];
          sequence.push([note, duration]);
        }
      }
    }
  }

  return sequence;
}