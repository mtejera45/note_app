import React from "react";
import "./styles.css";
import {nanoid} from "nanoid"
import SideBar from "./Components/SideBar";
import Editor from "./Components/Editor";
import moment from "moment";

export default function Note(){
  
  const[notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || [])
  const[currentNoteId, setCurrentNoteId] = React.useState(notes[0] && notes[0].id) || []
  const[currentNoteIdForStyle, setCurrentIdForStyle] = React.useState(notes[0] && notes[0].id) || []
  const[currentNoteIdForSeleted, setCurrentNoteIdForSeleted] = React.useState(notes[0] && notes[0].id) || []


  console.log(notes)
  console.log("currentNoteId: " + currentNoteId)
  console.log("currentNoteIdForStyle: " + currentNoteIdForStyle)


  function createNewNote(){
    const newNote ={
      id: nanoid(),
      body: "New note...",
      time: moment().subtract(10, 'days').calendar(),
      erase: null,
      highLight: null,
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
    setCurrentIdForStyle(newNote.id)
    setCurrentNoteIdForSeleted(newNote.id)
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

  function eraseOn(event, id){
    event.stopPropagation()
    if(currentNoteIdForStyle === id){
      setNotes(prevNotes => {
        return prevNotes.map(note => {
          if(note.id === id){
            return{ ...note, erase: true}
          } else {
              return note
          }
        })
      })
    }
  }
  function eraseOff(event, id){
    event.stopPropagation()
    if(currentNoteIdForStyle === id){
      setNotes(prevNotes => {
        return prevNotes.map(note => {
          if(note.id === id){
            return{ ...note, erase: false}
          }else{
            return note
          }
        })
      })
    }
  }
  function highLightOn(event, id){
    event.stopPropagation()
    if(currentNoteIdForSeleted === id){
      setNotes(prevNotes => {
        return prevNotes.map(note => {
          if(note.id === id){
            return{ ...note, highLight: true}
          }if (note.id !== id){
            return{ ...note, highLight: false}
          }else {
            return note
          }
        })
      })
    }
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
        eraseOn={eraseOn}
        eraseOff={eraseOff}
        setCurrentIdForStyle={setCurrentIdForStyle}
        setCurrentNoteIdForSeleted={setCurrentNoteIdForSeleted}
        highLightOn={highLightOn}

      /> 
      <Editor
        setNotes={setNotes}
        currentNoteId={currentNoteId}
      />
    </div>
  )
}

