import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useEffect } from 'react';


function Home() {

  // CHECK USER SESSION
  useEffect(()=>{
    axios.get('http://localhost:8081/')
    .then(res=>{
      console.log(res.data);
    })
    .then( err => console.log(err))
  },[])  
  
  const Open = true;
  return (
    <section className='w-full h-screen flex items-center'>
      <Sidebar/>
      <main className={`w-full flex flex-col h-screen ${Open ? 'flex-grow' : 'flex-shrink'}`}>
        <Navbar/>
        <div className='h-auto overflow-y-auto'>
          <Outlet/>
        </div>
      </main>
    </section>
  )
}

export default Home;