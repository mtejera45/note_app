import React from "react"
import "../styles.css";


export default function SideBar(props){
    const notesArray = props.notes.map((note, index) => (
        /* SideBar Style I */
        <div 
        key={note.id}
        onClick={(event)=> props.updateText(note) }
        >
            <div className="note-container"
            
            onClick={()=> props.setCurrentNoteId(note.id)}
            >
                <h4 className="side-bar-notes">
                    {   note.body.split("\n")[0].length > 10? 
                        note.body.split("\n")[0].substring(0,15)+"..." 
                        : note.body.split("\n")[0]}
                    <br/>
                    {/* I would like to add a second line with a description for each note. 
                    However, the line of code below does not work.  */}
                    {/* <span>{note.body.split("\n")[1].substring(0,15)+"..."}</span>
                    Important: the app runs well if I remove this part of the line --> .substring(0,15)+"...".
                    However, it is important to cut the text of the description.
                      */}
                    <span className="time">{note.time}</span>
                </h4>
                <button
                className="remove-button"
                onClick={(event)=> props.deleteNote(event, note.id) }
                >⌫</button>
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
