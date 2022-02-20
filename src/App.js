import React from "react";
import "./styles.css";
import {nanoid} from "nanoid"
import SideBar from "./Components/SideBar";
import Editor from "./Components/Editor";
import moment from "moment";

export default function Note(){
  
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || [])

  const[currentNoteId, setCurrentNoteId] = React.useState(notes[0] && notes[0].id) || []

  function createNewNote(){
    const newNote ={
      id: nanoid(),
      body: "New note...",
      time: moment().subtract(10, 'days').calendar()
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
    document.getElementById("textarea123").value = newNote.body;
  } 
  function deleteNote(event, noteId){
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    document.getElementById("textarea123").value = "";
  }
  function updateText(note) {
    document.getElementById("textarea123").value = note.body;
  }
  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  return(
    <div className="app-container">
      <SideBar
        notes={notes}
        createNewNote={createNewNote}
        setCurrentNoteId={setCurrentNoteId}
        deleteNote={deleteNote}
        updateText={updateText}
      /> 
    <Editor
      setNotes={setNotes}
      currentNoteId={currentNoteId}
    />
    </div>
  )
}

