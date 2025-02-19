const notes = [];
function saveNote(content, id) {
  const note = {
    content: content,
    id: id,
  };
  notes.push(note);
}
saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);
saveNote("Do dishes", 3);
saveNote("Take shower", 4);
console.log(notes[0]);
console.log(notes[1]);

function getNote(id) {
  if (id) {
    if (Number.isInteger(id)) {
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
          return notes[i];
        }
      }
    } else {
      console.log(`Id is not number`);
    }
  } else {
    console.log(`Id is not specified`);
  }
}

function logOutNotesFormatted() {
  for (let i = 0; i < notes.length; i++) {
    console.log(
      `The note with id: ${notes[i].id}, has the following note text: ${notes[i].content}`
    );
  }
}

//Unique feature

function deleteNote(id) {
  for (let i = 0; i < notes.length; i++) {
    if (id === notes[i].id) {
      notes.splice(i, 1);
      console.log(`Note with Id ${id} has been deleted.`);
    }
  }
}

const firstNote = getNote(2);
console.log(firstNote);
getNote();
getNote("eli");
logOutNotesFormatted();
deleteNote(3);
logOutNotesFormatted();
