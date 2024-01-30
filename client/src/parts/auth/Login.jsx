import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
// import image
import lab from '../../assets/lab.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';



function Login() {
    
    const [values, setValues] = useState({
        name: '',
        password: ''
    })

    const [icon, setIcon] = useState(false);
    const [error, SetError] = useState('');

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        if (!values.name.trim() || !values.password.trim()){
            SetError('Name or Password can\'t be empty');
            return
        }
        SetError('')

        axios.defaults.withCredentials = true;
        
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if (res.data.Status === 'Success'){
                console.log('there is an success', res.data.token);
                localStorage.setItem('token', res.data.token);
                sessionStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/')
            }else{
                console.log('there is an error', res.data.Error)
                return SetError(res.data.Error)
        
            }
        })
        .catch(err => console.log(err));
    }

  return (
    <section className="w-full h-screen grid place-items-center ">
        <div className="w-2/3  h-auto flex items-center space-x-8 shadow transition-all duration-300">
            <div className="w-96 hidden lg:block transition-all duration-300">
                <img src={lab} alt="" />
            </div>
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Login
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to register.
                </Typography>
                {error && (
                    <Typography className="mt-2 text-center font-normal text-red-700">
                    {error}
                    </Typography>
                )}
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" value={values.name} label="Name" onChange={(e)=>setValues({...values, name: e.target.value})} />
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
                    <Button type="submit" color="blue" fullWidth className='mt-16 bg-blue-900'>
                    Login
                    </Button>
                    <Typography color="gray" type="" className="mt-4 text-center font-normal">
                    <div className="w-72 flex items-center "> <Link to='/reset'>Reset password</Link></div>
                    <div className="w-56 flex items-center justify-between">
                        Dont have an account?{" "}
                        <Link to="/signup" className="font-bold text-red-700">
                            Sign Up
                        </Link>
                    </div>
                    
                    
                    </Typography>
                </form>
            </Card>

        </div>
        
    </section>
  )
}

export default Login