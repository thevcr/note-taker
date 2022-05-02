const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  // Send a message to the client
  res.json(`${req.method} request received to get notes`);

  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});

// GET request for a single Note
app.get('/api/notes/:notes_id', (req, res) => {
  if (req.body && req.params.notes_id) {
    console.info(`${req.method} request received to get a single a Note`);
    const NoteId = req.params.notes_id;
    for (let i = 0; i < notes.length; i++) {
      const currentNote = notes[i];
      if (currentNote.notes_id === NoteId) {
        res.json(currentNote);
        return;
      }
    }
    res.json('Note ID not found');
  }
});

// POST request to add a note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      // Convert the data to a string so we can save it
      const noteString = JSON.stringify(newNote);
  
      // Write the string to a file
      //NEED TO READ AND WRITE FILE EACH TIME
      fs.readFile(`./db.json`, noteString+',', (err) =>
        err
          ? console.error(err)
          : console.log(
              `Review for ${newNote.product} has been written to JSON file`
            )
      );
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
  });

  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
