import React, { useContext} from 'react';
import {NotesContext} from '../context/NotesContext';

const Note = ({note}) => {

    const {deleteNote} = useContext(NotesContext);

    return ( 
        <li className="bg-white flex items-center shadow-lg rounded-lg my-2
        py-2 px-4">
            <p className="flex-1 text-grey-800">{note.fields.description}</p>
            <button
                    type="button"
                    className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                    onClick= {() => deleteNote(note.id)}>
             Delete
            </button>
        </li>
     );
}
 
export default Note;