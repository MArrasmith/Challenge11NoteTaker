const express = require("express");
const path = require('path');
const fs = require('fs');
const app = express();
const uuidv4 = require('uuid')
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));
// `GET /notes` should return the `notes.html` file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});
// `GET *` should return the `index.html` file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});
// `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err
        let dbData = JSON.parse(data)
        res.json(dbData)
    });   
});
// `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
    const newNote = req.body
// You'll need to find a way to give each note a unique id
    newNote.id = uuidv4()
    db.push(newNote)
// On the back end, the application should include a `db.json` file that will be used to store and retrieve notes using the `fs` module.
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db)
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
