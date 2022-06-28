import './App.css';
import { Route } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/RegisterPage';
import MainPage from './page/MainPage';
import { Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      <Route path="/main" element={<MainPage></MainPage>}></Route>
    </Routes>
  );
};

export default App;
