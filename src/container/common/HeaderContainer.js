import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../componet/common/Header';
import { logout } from '../../module/user';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  return <Header user={user} onLogout={onLogout}></Header>;
};

export default HeaderContainer;
