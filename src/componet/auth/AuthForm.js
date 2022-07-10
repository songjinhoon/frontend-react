import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../node_modules/react-router-dom/index';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const AuthFromBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const textMap = {
  signin: '로그인',
  signup: '회원가입',
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFromBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput autoComplete="username" name="id" placeholder="아이디" onChange={onChange} value={form.id}></StyledInput>
        <StyledInput autoComplete="new-password" name="pwd" placeholder="비밀번호" type="password" onChange={onChange} value={form.pwd}></StyledInput>
        {type === 'signup' && (
          <StyledInput
            autoComplete="new-password"
            name="pwdConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.pwdConfirm}
          ></StyledInput>
        )}
        {type === 'signup' && <StyledInput name="nm" placeholder="이름" onChange={onChange} value={form.nm}></StyledInput>}
        {error && <ErrorMessage>에러 발생!</ErrorMessage>}
        <ButtonWithMarginTop cyan fullWidth>
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>{type === 'signin' ? <Link to="/signup">회원가입</Link> : <Link to="/signin">로그인</Link>}</Footer>
    </AuthFromBlock>
  );
};

export default AuthForm;
