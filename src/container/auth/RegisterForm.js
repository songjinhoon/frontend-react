import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from '../../../node_modules/react-router-dom/index';
import AuthForm from '../../componet/auth/AuthForm';
import { changeField, initializeForm, signUp } from '../../module/auth';
import { check } from '../../module/user';

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.signUp,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'signUp',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { id, pwd, pwdConfirm, nm } = form;
    if ([id, pwd, pwdConfirm, nm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }

    if (pwd !== pwdConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      /* ?? 버그인가 */
      changeField({ form: 'signUp', key: 'pwd', value: '' });
      changeField({ form: 'signUp', key: 'pwdConfirm', value: '' });
      return;
    }
    dispatch(signUp({ id, pwd, pwdConfirm, nm }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      setError('회원 가입 실패');
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/main');
      try {
        localStorage.setItem('user', JSON.stringify('user'));
      } catch (e) {
        console.log(e);
      }
    }
  }, [navigate, user]);

  return <AuthForm type="signup" form={form} onChange={onChange} onSubmit={onSubmit} error={error}></AuthForm>;
};

export default RegisterForm;
