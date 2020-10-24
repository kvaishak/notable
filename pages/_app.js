import '../styles/index.css';
import {NotesProvider} from '../context/NotesContext';

function MyApp({ Component, pageProps }) {
  return (
    <NotesProvider>
        <div className="container mx-auto my-10 max-w-xl">
          <Component {...pageProps} />
        </div>
    </NotesProvider>
    )
  
  
}

export default MyApp
