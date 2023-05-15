import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
  const AuthWrapper = (props) => {
    try{
      const user = JSON.parse(localStorage.getItem('user'));
      if(!user)
      {
        return <Navigate to="/login" />;
      }
      return <Component {...props} user={user} />;
    }
    catch{
      
      return <Navigate to="/login" />;
    }

    //return <Component {...props} user={user} />;
  };

  return AuthWrapper;
};

export default withAuth;
