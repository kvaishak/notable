import Head from 'next/head';
import Navbar from '../components/Navbar';
import Note from '../components/Note';
import {table, minifyRecord} from './api/utils/Airtable';
import {NotesContext} from '../context/NotesContext';
import { useEffect, useContext } from 'react';


export default function Home({initialNotes}) {

const {notes, setNotes} = useContext(NotesContext);

useEffect(() =>{
  setNotes(initialNotes);
},[]);

  return (
    <div>
      <Head>
        <title>Notable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
       <h1>Notable</h1>
       <ul>
         {notes &&
         notes.map(note => (
          <Note key={note.id} note={note} />
        ))
         }
       
       </ul>
      </main>
       
    </div>
  )
}

 export async function getServerSideProps(context){
  try{
    const notes = await table.select({}).firstPage();

    return {
      props: {
        initialNotes: minifyRecord(notes)
      }
    };
  }catch(err){
    console.error(err);
    return{
      props: {
        err: "Something went wrong"
      }
    }
  }
 
 }