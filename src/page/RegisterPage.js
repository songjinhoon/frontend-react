import React from 'react';
import AuthForm from '../componet/auth/AuthForm';
import AuthTemplate from '../componet/auth/AuthTemplate';

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type="register"></AuthForm>
    </AuthTemplate>
  );
};

export default RegisterPage;
