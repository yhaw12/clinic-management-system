import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LineCharts from '../components/charts/LineCharts';
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import Pies from '../components/charts/Pies';
// import { useEffect, useState } from 'react';
// import axios from 'axios';


function Dashboard() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const columns =[
      {
        name: 'PATIENT NAME',
        selector: row=>row.id
      },
      {
        name: 'DATE OF BIRTH',
        selector: row=>row.name
      },
      {
        name: 'CONTACT PHONE',
        selector: row=>row.email
      },
      {
        name: 'CITY',
        selector: row=>row.address.city
      }
     ]

     const [records, setRecords] = useState([])
     const [pathologyData, setPathologyData] = useState({clients : [], total : 0})



    
    //  PULL CLIENTS DATA
      useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => {
            setRecords(res.data);
        })
        .catch(err => console.log(err))

        const fetchPathologyData = async ()=>{
          try{
            const res = await axios.get('http://localhost:8081/pathology');
            setPathologyData(res.data);
          } catch (err) {
            console.error(err);
        }
        }
        fetchPathologyData()
    }, []);
  

  return (
    <div className='w-full h-auto flex items-center justify-between px-4  my-8'>
        <Box sx={{ flexGrow: 1 }} className=' outline p-4'>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Item className='h-32 flex flex-col items-center justify-center'>
                    <div className='text-2xl font-extrabold'>Total Clients</div>
                    <div className='text-xl'>678</div>               
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item className='h-32 flex flex-col items-center justify-center'>
                    <div  className='text-2xl font-extrabold'>Pathology</div>
                    <div className='text-xl'>{pathologyData.total}</div>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item className='h-32 flex flex-col items-center justify-center'>
                    <div  className='text-2xl font-extrabold'>Radiology</div>
                    <div className='text-xl'>769</div>
                  </Item>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <LineCharts/>
              </Item>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Item>
              <DataTable
                columns={columns} 
                data={records.slice(0,5)}
                // paginationServerSide
              >
              </DataTable>
            </Item>    
          </Grid>
        </Box>
    </div>
   )
}

export default Dashboard



