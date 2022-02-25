import React from "react"
import moment from "moment";


export default function Editor({setNotes, currentNoteId, notes}){
    
    function updateNote(event){

        const title = 
        event.target.value.split("\n",1)[0].length >10? 
        event.target.value.split("\n",1)[0].substring(0,15)+"..." 
        : event.target.value.split("\n",1)[0];

        const description = 
        event.target.value.split("\n").slice(1,3).toString().length>25?
        event.target.value.split("\n").slice(1,3).toString().substring(0,25)+"..."
        :  event.target.value.split("\n").slice(1,3).toString();

        setNotes(oldNotes => {
            const newArray = []
            
            for(let i = 0; i < oldNotes.length; i++) {
                const oldNote = oldNotes[i]
                if(oldNote.id === currentNoteId) {
                    newArray.unshift({ 
                        ...oldNote, 
                        body: event.target.value,
                        title: title,
                        description: description.split(',').join(" "),
                        time: moment().calendar(), }
                        
                        )
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
                placeholder='Click on ➕ for a new note.'
                className="text-area"
                onChange={updateNote}     
            ></textarea>
        
        </div>
    )
}
