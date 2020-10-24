import Head from 'next/head';
import Navbar from '../components/Navbar';
import Note from '../components/Note';
import {table, minifyRecord} from './api/utils/Airtable';
import {NotesContext} from '../context/NotesContext';
import { useEffect, useContext } from 'react';
import auth0 from './api/utils/auth0';


export default function Home({initialNotes, user}) {

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
      <Navbar user={user} />
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

  const session = await auth0.getSession(context.req);

  try{
    const notes = await table.select({}).firstPage();

    return {
      props: {
        initialNotes: minifyRecord(notes),
        user: session?.user || null,
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