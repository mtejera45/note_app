import React from "react"
import "../styles.css";

export default function SideBar(props){

    const notesArray = props.notes.map((note, index) => (
        
        <div 
        key={note.id}
        onClick={(event)=> {
            props.updateText(note);
            props.highLightOn(event, note.id);
            props.setCurrentNoteId(note.id)
        }}
        onMouseMove={(event)=>
           {props.eraseOn(event, note.id);
            props.setCurrentIdForStyle(note.id)
            props.setCurrentNoteIdForSeleted(note.id)
        }}
        onMouseLeave={(event)=>
            props.eraseOff(event, note.id)}
        >
            <div className="note-container">       
                <div 
                    className={note.highLight? "each-note-container-no": "each-note-container"}                >
                    <div className="side-bar-notes">

                    {note.title}
                    <br/>
                    {note.description}

                    <span className="time">{note.time}</span>
                    </div>
                    <button className={note.erase? "remove-button": "remove-button-no"}
                        onClick={(event)=> props.deleteNote(event, note.id) }
                    >⌫</button>
                </div>
     
             </div>

        </div>
    ))

    return(
        /* SideBar Style II */

        <div className="side-bar">
            
            <div className="side-bar-header">
                <h3>NOTES:</h3>
                <button 
                    className="plus-button" 
                    onClick={props.createNewNote}>+</button>
            </div>
            
            <div className="notes-main-container">{notesArray}</div>

        </div>
    )
}
