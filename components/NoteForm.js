import React, { useState, useEffect, useContext } from 'react';
import {NotesContext} from '../context/NotesContext';

const NoteForm = () => {
    const [note, setNote] = useState('');
    const {addNote} = useContext(NotesContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note);
        setNote('');
    }
    return ( 
        <form className="form my-6" onSubmit={handleSubmit}>
            <div className="flex flex-col text-sm mb-2">
                <label className="font-bold mb-2 text-gray=800" htmlFor="note">Note</label>
                <textarea 
               
                name="note" 
                id="note"
                value={note}
                onChange={(e)=> setNote(e.target.value)}
                placeholder="I am awesome"
                className="border border-gray-200 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"></textarea>
            </div>
            <button className="w-full rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4" type="submit">Submit</button>
        </form>
     );
}
 
export default NoteForm;