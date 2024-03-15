import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import Header from '../components/header/Header';


const Layout = () => {
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;