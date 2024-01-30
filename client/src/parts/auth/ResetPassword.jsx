import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
// import image
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ResetPassword() {

    const {id} = useParams()
    const [values, setValues] = useState({
        password: ''
    })

    const [icon, setIcon] = useState(false);
    const [error, SetError] = useState('');

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        if (!values.password.trim()){
            SetError('Password can\'t be empty');
            return
        }
        SetError('')

        axios.defaults.withCredentials = true;
        
        axios.put(`http://localhost:8081/reset/${id}`, values)
        .then(res => {
            if (res.data.Status === 'Success'){
                console.log('there is an success', res.data.token);
                navigate('/')
            }else{
                console.log('there is an error', res.data.Error)
                return SetError(res.data.Error)
        
            }
        })
        .catch(err => console.log(err));
    }

  return (
    <section className="w-screen h-screen grid place-items-center ">
        <div className="px-2 h-auto flex items-center space-x-8 shadow-2xl border transition-all duration-300">
            <Card color="transparent" shadow={false}>
                      <Typography color="gray" className="m-auto font-bold text-lg">
                        Reset Your Password.
                    </Typography>

                
                {error && (
                    <Typography className="mt-2 text-center font-normal text-red-700">
                    {error}
                    </Typography>
                )}
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col gap-6">
                    <div className="flex items-center relative">
                    <Input type={icon ? "text" : "password"} size="lg" label="Password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />

                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2"> 
                    {icon ?
                        <FaEye onClick={() => setIcon(false)} cursor='pointer' /> :
                        <FaEyeSlash onClick={() => setIcon(true)} cursor='pointer' />
                    }
                    </div>
                  
                </div>
                    </div>
                    <Button type="submit" color="blue" fullWidth className='mt-12 bg-blue-900'>
                    Reset Password
                    </Button>
                                        
                </form>
            </Card>

        </div>
        
    </section>
  )
}

export default ResetPassword
