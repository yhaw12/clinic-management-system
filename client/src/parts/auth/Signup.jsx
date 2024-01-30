import {
    Card,
    Input,
    // Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  
  import { FaEye, FaEyeSlash } from 'react-icons/fa';  
  
  // import image
  import lab2 from '../../assets/lab2.jpg'
  import { Link, useNavigate } from "react-router-dom";
  
  import axios from "axios";
  import { useState } from "react";
  
  function Signup() {
    
    const [values, setValues] = useState({
      name: '',
      email: '',
      password: ''
    });

    const [icon, setIcon] = useState(false);
    const [error, SetError] = useState('');

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
      if (!values.name.trim() || !values.password.trim() || !values.email.trim()) {
        SetError('Name, Email, or Password can\'t be empty');
        return;
      }
      SetError('');
  
      axios.post('http://localhost:8081/signup', values)
        .then(res => {
            if (res.data.Status === 'Success'){
                navigate('/');

            }else{
                return SetError(res.data.Error)
            }
        })
        .catch(err => console.log(err));
    }
  
    return (
      <section className="w-full h-screen grid place-items-center">
        <div className="w-2/3 h-auto flex items-center space-x-8 shadow-lg transition-all duration-300">
          <div className="w-80 hidden lg:block transition-all duration-300">
            <img src={lab2} alt="" />
          </div>
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Create An Account
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter your details to register.
            </Typography>
            {error && (
                <Typography className="mt-2 text-center font-normal text-red-700">
                  {error}
                </Typography>
              )}
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"  onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col gap-6">
                <Input size="lg" label="Name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
                <Input size="lg" label="Email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
                <div className="flex items-center relative">
                  <Input type={icon ? "text" : "password"} size="lg" label="Password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />

                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2"> {icon ?
                        <FaEye onClick={() => setIcon(false)} cursor='pointer' /> :
                        <FaEyeSlash onClick={() => setIcon(true)} cursor='pointer' />
                    }</div>
                  
                </div>
              </div>
              <Button className="mt-6 bg-blue-900" color="blue" type="submit" fullWidth >
                Sign Up
              </Button>
              
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-red-900">
                  Login
                </Link>
              </Typography>
            </form>
          </Card>
        </div>
      </section>
    )
  }
  
  export default Signup;
  