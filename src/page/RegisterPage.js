import React from 'react';
import AuthTemplate from '../componet/auth/AuthTemplate';
import RegisterForm from '../container/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <RegisterForm></RegisterForm>
    </AuthTemplate>
  );
};

export default RegisterPage;
