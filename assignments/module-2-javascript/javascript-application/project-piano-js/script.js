// Create an AudioContext object
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Object to store loaded piano samples
const pianoSamples = {};

// Function to load piano samples
function loadPianoSamples() {
  const notes = [
    "key01",
    "key02",
    "key03",
    "key04",
    "key05",
    "key06",
    "key07",
    "key08",
    "key09",
    "key10",
    "key11",
    "key12",
    "key13",
    "key14",
    "key15",
    "key16",
    "key17",
    "key18",
    "key19",
    "key20",
    "key21",
    "key22",
    "key23",
    "key24",
  ];
  // Load each piano sample asynchronously
  const promises = notes.map((note) => {
    return fetch(`./static/samples/piano/${note}.ogg`)
      .then((response) => response.arrayBuffer())
      .then((buffer) => audioContext.decodeAudioData(buffer))
      .then((decodedBuffer) => {
        pianoSamples[note] = decodedBuffer;
      });
  });

  // Wait for all samples to load
  return Promise.all(promises);
}
// Map piano notes to button ids
const noteToButtonIdMapping = {
  key08: "key-1",
  key09: "key-2",
  key10: "key-3",
  key11: "key-4",
  key12: "key-5",
  key13: "key-6",
  key14: "key-7",
  key15: "key-8",
  key16: "key-9",
  key17: "key-10",
  key18: "key-11",
  key19: "key-12",
  key20: "key-13",
  key21: "key-14",
  key22: "key-15",
  key23: "key-16",
  key24: "key-17",
};

// Map keyboard keys to piano notes
const keyCodeToNoteMapping = {
  65: "key08", // a
  87: "key09", // w
  83: "key10", // s
  69: "key11", // e
  68: "key12", // d
  70: "key13", // f
  84: "key14", // t
  71: "key15", // g
  89: "key16", // y
  72: "key17", // h
  85: "key18", // u
  74: "key19", // j
  75: "key20", // k
  79: "key21", // o
  76: "key22", // l
  80: "key23", // p
  186: "key24", // ;
  192: "key24", // ñ for Spanish layout
};
// Function to play the audio for a given note
function playNote(note) {
  // Create an AudioBufferSourceNode
  const source = audioContext.createBufferSource();

  // Set the loaded piano sample as the buffer
  source.buffer = pianoSamples[note];

  // Connect the source to the audio context destination (speakers)
  source.connect(audioContext.destination);

  // Start playing the piano sample
  source.start();
}
function playNoteWithMouse(note) {
  playNote(note);
}

// Add event listeners to piano keys
for (const note in noteToButtonIdMapping) {
  const buttonId = noteToButtonIdMapping[note];
  const button = document.getElementById(buttonId);

  button.addEventListener("mousedown", () => {
    playNoteWithMouse(note);
  });
}
// Function to play the audio for a given note
function playNoteWithKey(note) {
  playNote(note);
}

// Add event listener for keydown event on the document
document.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  const note = keyCodeToNoteMapping[keyCode];

  if (note) {
    playNoteWithKey(note);
  }
});

// Load the piano samples and start the application
loadPianoSamples();
