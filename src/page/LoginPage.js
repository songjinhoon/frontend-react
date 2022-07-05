import React from 'react';
import AuthTemplate from '../componet/auth/AuthTemplate';
import LoginForm from '../container/auth/LoginForm';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <LoginForm></LoginForm>
    </AuthTemplate>
  );
};

export default LoginPage;
