import React, { useState, useEffect } from 'react';

import SignUpForm from '../../components/Auth/SignUp';

const SignUpPage = () => {
  const [subDomain, setSubDomain] = useState(null);
  const [signUp, setSignUp] = useState(false);
  useEffect(() => {
    const { host } = window.location;
    // console.log('host', host);
    const arr = host.split('.').slice(0, host.includes('localhost') ? -1 : -2);
    if (arr.length > 0) setSubDomain(arr[0]);
  }, []);

  const isSignUpClick = () => {
    setSignUp(!signUp);
  };

  // console.log('subDomain', subDomain);
  // console.log('issignUp', signUp);

  return (
    <div>
      <SignUpForm
        subDomain={subDomain}
        className="place-content-center "
        isSignUpClick={isSignUpClick}
      />
    </div>
  );
};
export default SignUpPage;
