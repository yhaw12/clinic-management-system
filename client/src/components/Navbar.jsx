import axios from "axios";
import { useEffect, useState } from "react"
import { FaSun, FaMoon } from 'react-icons/fa';
import { useLocation, useNavigate } from "react-router-dom";
// import { useLocation } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate()
  const [openDrawer, setOpenDrawer] = useState(false);
  const [profileName, setProfileName] = useState('');

  
  const location = useLocation();
  const pageName = location.pathname.substring(1).toLocaleUpperCase();


  const darkMode =()=>{
    const html = document.querySelector('html');
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  const handleSignOut =()=>{
    axios.post('http://localhost:8081/logout')
    .then(res => {
      if (res){
        localStorage.removeItem('token')
        navigate('/login');
        console.log('i am')
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  useEffect(()=>{
    axios.get('http://localhost:8081/login', { withCredentials: true })
    .then(res =>{
      if (res.data.Status === 'Success'){
        setProfileName(res.data.name)
      }
    })
  },[])


  return (
    <section className='w-auto flex shadow relative'>
        <div className='w-full h-20 flex items-center justify-between px-10  mr-1'>
          {/* <h1>{pageName}</h1> */}
          <h1 className="">{pageName}</h1>
          <div className="flex flex-row items-center " >
            <div className=" inline-flex items-center px-2 justify-between"><FaSun/> <FaMoon onClick={darkMode}/></div>
          
            <div>{profileName}</div>
            <svg  onClick={()=>setOpenDrawer(!openDrawer)}  id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="w-2.5 h-2.5 ml-2.5 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
           </svg>
          </div>
        </div>
        
        <div id="dropdown" className={`z-10 bg-white divide-y divide-gray-100 rounded-sm w-44 dark:bg-gray-200 absolute top-full right-0 mt-1 shadow-md ${!openDrawer ? 'hidden' : 'block'}`}>
           <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
             <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-black"> Dashboard</a></li>
             <li> <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-black"> Settings </a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-black">Earnings</a></li>
            <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-black" onClick={handleSignOut}>Sign out</a></li>
          </ul>
      </div>
        
    </section>
    

  )
}

export default Navbar