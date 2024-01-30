import { useCallback, useEffect, useState } from "react"
import {  FaTimes, FaUpload } from "react-icons/fa";
import profileIcon from '../assets/profile-icon.png';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Profile() {

  // const navigate = useNavigate();
  const [open , setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    image: '',
    address: ''
  })

  const { id } = useParams();
  const navigate = useNavigate()
  // popup should open when the loads
  useEffect(() => {
    if (values === null) {
      setOpen(true);
    }
  }, [values]);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('email', values.email);
    formData.append('address', values.address);

    try {
      const res = await axios.post(`http://localhost:8081/users/${id}`, formData);
       if (res.data.Status === 'Success'){
        console.log('Successing')
        setOpen(false);
        navigate(`/users/${res.data.id}`);
       }
       
    } catch (error) {
      console.error(error);
    }
}
 
const getUserInfo = useCallback(async () => {
  try {
    const res = await axios.get('http://localhost:8081/login/');
    setValues(prevValues => ({ ...prevValues, name: res.data.name, email: res.data.email })); 
    console.log(res.data)
    } catch (error) {
    console.error(error);
  }
}, []);

useEffect(()=>{
  getUserInfo();
},[getUserInfo])


  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handlePopUp = () =>{
    setOpen(true)
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="w-3/5 h-96 px-10 m-auto  text-black shadow-lg bg-slate-200 relative">
      <div className="bottom"><h1 className="text-center text-2xl">User Profile</h1></div>
      <main className={`h-72 inline-flex items-center justify-between relative  ${open? 'opacity-20': ''}`}>
        <div className="absolute top-6 right-5 cursor-pointer "><FaUpload onClick={handlePopUp}/></div>
          <div className="w-3/4 ">
            <div className="w-full flex items-center py-2 mb-4 gap-10"><label className="w-1/5">Name:</label> <h2 className="w-4/5">{values.name}</h2></div>
            <div className="w-full flex items-center py-2 mb-4 gap-10"><label className="w-1/5">Adress:</label><h2 className="w-4/5">{values.address}</h2></div>
            <div className="w-full flex items-center py-2 mb-4 gap-10"><label className="w-1/5">Phone:</label> <h2 className="w-4/5">{values.phone}</h2></div>
            <div className="w-full flex items-center py-2 mb-4 gap-10"><label className="w-1/5">Email:</label><h2 className="w-4/5">{values.email}</h2></div>
          </div>
          <div className="w-1/3 h-36">
          <img src={selectedFile ? URL.createObjectURL(selectedFile) : (values && values.image ? values.image : profileIcon)}/>
          </div>
      </main>

      {open && 
        <div className={`w-4/5 bg-slate-100 border pb-6 -top-1/2 absolute`}>
          <div className="w-full flex items-center justify-between bottom-2 border mb-4 px-4 py-4"><h2 className="font-bold text-lg">Update Lab Information</h2> <FaTimes className="cursor-pointer" onClick={()=>setOpen(false)}/></div>
          <div className="w-full m-auto px-6">
            <div className="w-full flex items-center justify-between mb-8"><label>Name:</label> <input className="bg-transparent border px-2 py-1 w-80 active:border-transparent " type="text" placeholder="Enter your Name" onChange={(e)=>setValues({...values, name: e.target.value})}/></div>
            <div className="w-full flex items-center justify-between mb-8"><label>Phone:</label> <input className="bg-transparent border px-2 py-1 w-80"type="text" placeholder="Enter your number" onChange={(e)=>setValues({...values, phone: e.target.value})}/></div>
            <div className="w-full flex items-center justify-between mb-8"><label>Email:</label> <input className="bg-transparent border px-2 py-1 w-80"type="text" placeholder="Enter your email" onChange={(e)=>setValues({...values, email: e.target.value})}/></div>
            <div className="w-full flex items-center justify-between mb-8"><label>Lab Logo:</label> <input className="w-80" type="file" name="" id="profile" onChange={handleFileUpload} accept="image/*"/></div>
            <div className="w-full flex items-center justify-between mb-8"><label>Address:</label> <textarea className=" w-80 h-16 bg-transparent border px-2 py-1"placeholder='Type your address' onChange={(e)=>setValues({...values, address: e.target.value})}></textarea></div>
          </div>

          <div className="w-28 flex items-center justify-between gap-2 m-auto">
            <button className="w-1/2 px-2 py-1 bg-slate-600 rounded-sm " onClick={()=>setOpen(false)}>Close</button>
            <button className="w-16 px-2 py-1 bg-green-500 inline-flex items-center rounded-sm " onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      }
    </div>
    </div>
  )
}

export default Profile



