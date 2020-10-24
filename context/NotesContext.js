import { createContext, useState } from 'react';

const NotesContext = createContext();

const NotesProvider = ({children}) => {
    const [notes, setNotes] = useState([]);

    const refreshNotes = async () => {
        try{
            const res = await fetch('/api/getNotes');
            const latestNotes = await res.json();
            setNotes(latestNotes);
        }catch(err){
            console.error(err);
        }
    }

    const addNote = async (description) => {
        try{
            const res = await fetch('/api/createNote',{
                method:'POST',
                body: JSON.stringify({description}),
                headers: {'Content-Type': 'application/json'}
            });
            const latestNotes = await res.json();
            setNotes((prevNotes) =>{
                return [latestNotes, ...prevNotes];
            });
        }catch(err){
            console.error(err);
        }
    }

    const updateNote = async (updatedNote) => {
        try{
            const res = await fetch('/api/updateNote',{
                method:'PUT',
                body: JSON.stringify({description}),
                headers: {'Content-Type': 'application/json'}
            });
            await res.json();
            setNotes((prevNotes) =>{
                const existingNotes = [...prevNotes];
                const existingNote = existingNotes.find(note => note.id === updatedNote.id);
                existingNote.fields = updatedNote.fields;
                return existingNotes;
            });
        }catch(err){
            console.error(err);
        }
    };

    const deleteNote = async (id) => {
        try{
         await fetch('/api/deleteNote',{
                method:'Delete',
                body: JSON.stringify({id}),
                headers: {'Content-Type': 'application/json'}
            });
            
            setNotes((prevNotes) =>{
                return prevNotes.filter((note) => note.id !== id);
            });
        }catch(err){
            console.error(err);
        }
    };

    return (<NotesContext.Provider value={{
        notes,
        setNotes,
        refreshNotes,
        updateNote,
        deleteNote,
        addNote,
    }}>
        {children}
    </NotesContext.Provider>);
};

export {NotesProvider, NotesContext};