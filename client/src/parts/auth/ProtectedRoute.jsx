
// import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';


const checkUserAuthentication = ()=>{
  const token = localStorage.getItem('token');
  return !!token
}



function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = checkUserAuthentication();


  useEffect(()=>{
    if (!isAuthenticated){
      navigate('/login');
    }
  },[navigate, isAuthenticated])

  return isAuthenticated ? children : null;
 
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute