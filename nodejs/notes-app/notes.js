const fs = require('fs');
const chalk = require('chalk');

const getNotes = (str) => {
  return `Your notes ${str}`
};

const addNote = function(title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({
      title,
      body
    })
    saveNotes(notes);
    console.log('New note is added')
  } else {
    console.log('Note title taken!')
  }
};

const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function() {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
};

const removeNote = function(title) {
  const notes = loadNotes();
  const noteTitles = new Set(notes.map(({title}) => title));
  if (noteTitles.has(title)) {
    const filteredNotes = notes.filter(data => data.title !== title);
    saveNotes(filteredNotes)
    console.log(chalk.green.inverse('Note removed!'));
  } else {
    console.log(chalk.red.inverse('No note found!'));
  }
};

const listNote = () => {
  const notes = loadNotes();
  notes.forEach(note => console.log(chalk.blue.bold(`your notes are ${note.title}`)))
};

const readNote = (title) => {
  const notes = loadNotes();
  // const readBodybyTitle = new Map(notes.map(({title, body}) => [title, body]));
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(`title: ${chalk.blue.bold(note.title)}, body: ${note.body}`)
  } else {
    console.log(chalk.red.inverse('Error'))
  }
}

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNote,
  readNote
};