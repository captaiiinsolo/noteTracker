const util = require('util');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFile('db/db.json');
    }

    write(note) {
        return writeFile('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes))
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

    addNotes(note) {
        const {title, text} = note;
        const newNote = { title, text, id: uuidv1() };
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updateNotes) => this.write(updateNotes))
            .then(() => newNote);
    }
    
    deleteNotes(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !=id))
            .then((filteredNotes) => this.write(filteredNotes));
    }
    
}

module.exports = new Store();
