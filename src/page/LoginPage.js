import React from 'react';
import AuthForm from '../componet/auth/AuthForm';
import AuthTemplate from '../componet/auth/AuthTemplate';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type="login"></AuthForm>
    </AuthTemplate>
  );
};

export default LoginPage;
