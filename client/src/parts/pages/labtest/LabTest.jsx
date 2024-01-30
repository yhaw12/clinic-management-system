import axios from "axios";
import { useEffect, useState, useMemo} from "react";
import DataTable from 'react-data-table-component'
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";
// import { useParams } from "react-router-dom";
import Export from '../../../components/Export';
import { downloadCSV } from '../../../components/utils';
import { MdFileDownload } from "react-icons/md";
import Swal from 'sweetalert2'
import { deleteConfirmationLabCat } from "../../../components/utils/ButtonActions";

function LabTest() {
   const columns =[
    {
      name: 'ITEMS',
      selector: row=>row.name
    },
    {
      name: 'DEPARTMENT',
      selector: row=>row.department
    },
    {
      name: 'TEST PRICE',
      selector: row => row.price ,
    },
    {
      name : 'ACTIONS',
      cell: row => <div>
        {/* <button className="bg-[#0c6b79] rounded-sm p-2 mr-2" onClick={()=>deletePopUp(row.id)}>Print Report</button> */}
        <button className="bg-red-500 rounded-sm p-2" onClick={()=>handleDelete(row.id)}><FaTrash/></button>
        </div> 
    }
   ]

   const [values, setValues] = useState({
      name: '',
      department: 'option',
      price: ''
   })

   const [pending, setPending] = useState(true);
   const [records, setRecords] = useState([]);
   const [popUp, setPopUp] = useState(false);
   const [filterItems, setFilterItems] = useState([]);
   
   const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(records)} />, [records]);


    // SUBMIT TO THE DATABASE
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!values.name.trim() || !values.price.trim()) {
        Swal.fire('Error!', 'All fields are required.', 'error');
        return;
      }
      
      axios.post('http://localhost:8081/labcategory', values)
        .then(res=>{
          if (res.data.status === 'Record inserted successfully'){
              Swal.fire('Added!', 'Your new item has been added.', 'success');
              UserData(); 
              window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
          Swal.fire('Error!', 'Failed to add the item.', 'error');
        });
    }

    // PULL CLIENTS DATA
    function UserData(){
      axios.get('http://localhost:8081/labcategory') 
      .then(res => {
        setRecords(res.data);
        setFilterItems(res.data);
        setPending(false);
      })
      .catch(err => {
        console.log(err);
        Swal.fire('Error!', 'Failed to fetch the data.', 'error');
      });
    }
        useEffect(()=>{
          UserData();
        },[])

   

    // FILTER CLIENTS DATA
    const handleFilter=(e)=>{
      const newData = filterItems.filter(row=>row.name.toLowerCase().includes(e.target.value));
      setRecords(newData)
    }

  
    // DELETE CLIENTS DATA
    const handleDelete = (id) => {
      console.log(`handleDelete was called with id: ${id}`); 
      deleteConfirmationLabCat(id, records, setRecords, setFilterItems);
    }

    // DELET CONFIRMATION
    const cancelPopup = () =>{
      setPopUp(false)
    }


  return (
    <div className="w-full h-screen px-20 py-10 flex flex-col border-black border-2 ">
      <div className={`${popUp ? 'opacity-20' : ''} transition-all duration-300`}>
          <div className="mb-4 flex items-center justify-center"><h2 className=" text-4xl text-black font-extrabold">Lab Test Cat</h2></div>
          <div className=" h-10 mb-8 "><input className="w-96 px-4 border border-black py-2 rounded-md" type="text" placeholder="Search ........" onChange={handleFilter}/></div>

            <div className="w-96 flex  items-center gap-2 justify-between">
                <div className="w-46 px-2 flex items-center justify-between bg-[#0C6B79] rounded-sm py-2 cursor-pointer" onClick={()=>setPopUp(true)}><FaPlus color="black"/><h3 className="text-black ml-4 text-sm">Add Lab Test Category</h3></div>
            </div>
          
          <DataTable
            className="my-data-table"
            columns={columns} 
            data={records}
            selectableRows
            progressPending={pending}
            pagination
          >
            </DataTable>
          <div className="w-32 mb-3 flex items-center outline"><MdFileDownload color="black" className="absolute left-94 z-50"/>{actionsMemo}</div>
      </div>

      {popUp &&
           <div className=" text-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-auto w-2/4 px-10 py-5 bg-[#ddd] text-center my-0 mx-auto z-30 transition-all duration-300">
            
            <div className=" flex items-center justify-between mb-8 pb-4 shadow-md ">Add Lab Test Category <FaTimes onClick={cancelPopup} className="cursor-pointer"/></div>

            <div>
              <div className="flex items-center justify-between mb-4"><label htmlFor="">Category Name</label> <input className="w-64 p-2 border-white-200 border bg-transparent" type="text" required placeholder="FBC"   onChange={(e)=>setValues({...values, name: e.target.value.toLocaleUpperCase()})}/></div>
              <div className="flex items-center justify-between mb-4"><label htmlFor="">department</label> 
              <select name="" id="" placeholder="Select Department Name" className="w-64 border-white-200 border bg-transparent transition-all p-2" onChange={(e)=>setValues({...values, department: e.target.value})}>
                  <option value="FBC">FBC</option>
                  <option value="HB">HB</option>
                  <option value="Urine C/S">Urine C/S</option>
                  <option value="RDY">RDT</option>
              </select>
              </div>
              <div className="flex items-center justify-between mb-8 "><label htmlFor="number">Price</label><input className="w-64 p-2 border-white-200 border bg-transparent" required type="text" placeholder="Price"  onChange={(e)=>setValues({...values, price: e.target.value})}/></div>
            </div>
            <div className="w-32 flex items-center justify-between m-auto">
              <button className="bg-[#0C6B79] px-1 py-2 rounded-sm" onClick={handleSubmit}>Submit</button>
              <button className="border-2 border-black px-1 py-2" onClick={cancelPopup}>Cancel</button>
            </div>
         </div>
        }
    </div>
  )
}

export default LabTest;