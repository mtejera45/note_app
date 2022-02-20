import React from "react"
import moment from "moment";


export default function Editor({setNotes, currentNoteId}){
    

    function updateNote(event){
        setNotes(oldNotes => {
            const newArray = []
            for(let i = 0; i < oldNotes.length; i++) {
                const oldNote = oldNotes[i]
                if(oldNote.id === currentNoteId) {
                    newArray.unshift({ 
                        ...oldNote, 
                        body: event.target.value,
                        time: moment().calendar() })
                } else {
                    newArray.push(oldNote)
                }
            }
            return newArray
        })
    }
        
    return(
        <div className="editor">
            <h3 className="text">TEXT:</h3>
            <textarea
                id="textarea123"
                placeholder="Title: here...&#10;Note: here...&#10;"
                className="text-area"
                onChange={updateNote}     
            ></textarea>
        
        </div>
    )
}
