import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Notable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
       <h1>Notable</h1>
      </main>
       
    </div>
  )
}
