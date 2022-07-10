import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from '../../../node_modules/react-router-dom/index';
import AuthForm from '../../componet/auth/AuthForm';
import { authInit, changeField, initializeForm, signIn } from '../../module/auth';
import { complete } from '../../module/user';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.signIn,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'signIn',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { id, pwd } = form;
    dispatch(signIn({ id, pwd }));
  };

  useEffect(() => {
    dispatch(initializeForm('signIn'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log(authError);
      console.log('로그인 에러 발생');
      setError('로그인 실패');
      return;
    }
    if (auth) {
      const { data } = auth;
      dispatch(complete(data[0]));
      dispatch(authInit());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/main');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log(e);
      }
    }
  }, [navigate, user]);

  return <AuthForm type="signin" form={form} onChange={onChange} onSubmit={onSubmit} error={error}></AuthForm>;
};

export default LoginForm;
