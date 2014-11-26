// from https://github.com/hohonuuli/dna-music/blob/master/src/main/scala/hohonuuli/fasta/FastaProteinSeq.scala
// var aminoAcidMap = {
//   "A" : ["GCU", "GCC", "GCA", "GCG"], // Alanine
//   "B" : ["GAU", "GAC"],             // Aspartic acid or Asparagine (AAUAAC)
//   "C" : ["UGU", "UGC"],             // Cysteine
//   "D" : ["GAU", "GAC"],             // Aspartic Acid
//   "E" : ["GAA", "GAG"],             // Glutamic Acid
//   "F" : ["UUU", "UUC"],             // Phenylalanine
//   "G" : ["GGU", "GGC", "GGA", "GGG"],       // Glycine
//   "H" : ["CAU", "CAC"],             // Histidine
//   "I" : ["AUU", "AUC", "AUA"],          // Isoleucine
//   "K" : ["AAA", "AAG"],             // Lysine
//   "L" : ["UUA", "UUG", "CUU", "CUC", "CUA", "CUG"], // Leucine
//   "M" : ["AUG"],                // Methionine
//   "N" : ["AAU", "AAC"],             // Asparagine
//   "O" : ["UAG"],                // Pyrrolysine
//   "P" : ["CCU", "CCC", "CCA", "CCG"],       // Proline
//   "Q" : ["CAA", "CAG"],             // Glutamine
//   "R" : ["CGU". "CGC", "CGA", "CGG", "AGA", "AGG"], // Arginine
//   "S" : ["UCU", "UCC", "UCA", "UCG", "AGU"],    // Serine
//   "T" : ["ACU", "ACA", "ACC", "ACG"],       // Threonine
//   "U" : ["UGA"],                // Selenocysteine
//   "V" : ["GUU", "GUC", "GUA", "GUG"],       // Valine
//   "W" : ["UGG"],                // Tryptophan
//   "Y" : ["UAC, UAU"],             // Tyrosine
//   "Z" : ["GAA", "GAG",             // Glutamic acid or glutamine (CAACAG)
//   "X" : "",                   // any
//   "*" : "",                   // translation stop
//   "-" : ""                   // gap of indeterminate length
// };

var aminoAcidMap = {
  "GCT" : ["A", 1], // Alanine
  "GCC" : ["A", 2],
  "GCA" : ["A", 3],
  "GCG" : ["A", 4],

  "GAT" : ["B", 1],
  "GAC" : ["B", 2], // Aspartic acid or Asparagine (AAUAAC)

  "TGT" : ["C", 1],
  "TGC" : ["C", 2], // Cysteine

  "GAT" : ["D", 1],
  "GAC" : ["D", 2],  // Aspartic Acid

  "GAA" : ["E", 1],
  "GAG" : ["E", 2], // Glutamic Acid

  "TTT" : ["F", 1],
  "TTC" : ["F", 2], // Phenylalanine

  "GGT" : ["G", 1],
  "GGC" : ["G", 2],
  "GGA" : ["G", 3],
  "GGG" : ["G", 4], // Glycine

  "CAT" : ["H", 1],
  "CAC" : ["H", 2], // Histidine

  "ATT" : ["I", 1],
  "ATC" : ["I", 2],
  "ATA" : ["I", 3], // Isoleucine

  "AAA" : ["K", 1],
  "AAG" : ["K", 2], // Lysine

  "TTA" : ["L", 1],
  "TTG" : ["L", 2],
  "CTT" : ["L", 3],
  "CTC" : ["L", 4],
  "CTA" : ["L", 5],
  "CTG" : ["L", 6], // Leucine

  "ATG" : ["M", 1], // Methionine

  "AAT" : ["N", 1],
  "AAC" : ["N", 2], // Asparagine

  // "TAG" : ["O", 1], // Pyrrolysine

  "CCT" : ["P", 1],
  "CCC" : ["P", 2],
  "CCA" : ["P", 3],
  "CCG" : ["P", 4], // Proline

  "CAA" : ["Q", 1],
  "CAG" : ["Q", 2], // Glutamine

  "CGT" : ["R", 1],
  "CGC" : ["R", 2],
  "CGA" : ["R", 3],
  "CGG" : ["R", 4],
  "AGA" : ["R", 5],
  "AGG" : ["R", 6], // Arginine

  "TCT" : ["S", 1],
  "TCC" : ["S", 2],
  "TCA" : ["S", 3],
  "TCG" : ["S", 4],
  "AGT" : ["S", 5], // Serine
  "AGC" : ["S", 6], // Serine

  "ACT" : ["T", 1],
  "ACA" : ["T", 2],
  "ACC" : ["T", 3],
  "ACG" : ["T", 4], // Threonine 

  // "TGA" : ["U", 1], // Selenocysteine 

  "GTT" : ["V", 1],
  "GTC" : ["V", 2],
  "GTA" : ["V", 3],
  "GTG" : ["V", 4], // Valine 

  "TGG" : ["W", 1], // Tryptophan

  "TAC" : ["Y", 1],
  "TAT" : ["Y", 2], // Tyrosine

  "GAA" : ["Z", 1],
  "GAG" : ["Z", 2], // Glutamic acid or glutamine

  "TAA" : ["REST", 1],
  "TAG" : ["REST", 2], // Pyrrolysine
  "TGA" : ["REST", 3], // Selenocysteine 


  // "X" : "",                   // any
  // "*" : "",                   // translation stop
  // "-" : ""                   // gap of indeterminate length
};

var nucleicAcidMap = {
  "A" : "A",
  "C" : "C",
  "G" : "G",
  "T" : "T",
  "U" : "U",
  "R" : "GA",   // puRine
  "Y" : "TC",   // pYrmidine
  "K" : "GT",   // Ketone
  "M" : "AC",   // aMino group
  "S" : "GC",   // Strong interaction
  "W" : "AT",   // Weak interaction
  "B" : "GTC",  // (not A) B comes after a
  "D" : "GAT",  // (not C) D comes after c
  "H" : "ACT",  // (not G) H comes after g
  "V" : "GCA",  // (not T, not U) V comes after u
  "N" : "AGCT", // aNy
  "X" : "",     // masked
  "-" : ""     // gap of indterminate length
};

var mammals = "antelope, bear, beaver, bison, boar, camel, caribou, cattle, deer, elephant, elk, fox, giraffe, goat, hare, horse, ibex, kangaroo, lion, llama, moose, peccary, pig, rabbit, seal, sheep, squirrel, tiger, whale, yak, and zebra";

var birds = "chicken, duck, emu, goose, grouse, ostrich, pheasant, pigeon, quail, and turkey";

var reptiles = "turtle, snake, crocodile, alligator";

var fish = "anchovy, bass, catfish, carp, cod, eel, flounder, fugu, grouper, haddock, halibut, herring, mackerel, mahi mahi, marlin, orange roughy, perch, pike, pollock, salmon, sardine, shark, snapper, sole, swordfish, tilapia, trout, tuna, and walleye";

var crustaceans = "crab, crayfish, lobster, prawn, and shrimp";

var moHusks = "abalone, clam, conch, mussel, oyster, scallop, and snail";

var cephalopods = "cuttlefish, octopus, and squid";

var insects = "ants, bees, beetles, butterflies, cockroaches, crickets, damselflies, dragonflies, earwigs, fleas, flies, grasshoppers, mantids, mayflies, moths, silverfish, termites, wasps";

var nonArthropodInvertebrates = "flatworms, tapeworms, flukes, threadworms, roundworms, hookworms, segmented worms";

