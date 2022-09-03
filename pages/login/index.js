import React, { useState, useEffect } from 'react';
import LoginForm from '../../components/Auth/Login';

const LoginPage = () => {
  const [subDomain, setSubDomain] = useState(null);
  const [signUp, setSignUp] = useState(false);

  const isSignUpClick = () => {
    setSignUp(!signUp);
  };

  return (
    <div className="h-screen">
      <LoginForm isSignUpClick={isSignUpClick} />
    </div>
  );
};
export default LoginPage;
