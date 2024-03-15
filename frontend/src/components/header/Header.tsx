import React, { useContext, useEffect, useState } from 'react';
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AuthAction } from '../../store/AuthActions';
import Login from '../../pages/login/Login';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' } as AuthAction);
  }

  return (
    <div className="header-container">
      <div className="topbar-left">
        <Link to="/main" style={{ textDecoration: "none", color: "white" }}>
          <span className="logo">{state.user?.username}'s WORDBOOKS</span>
        </Link>
      </div>

      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
      
      <div className="topbar-right">
        <nav className="side-nav">
          <ul className="menu-list">
            <li className="menu-category">
              <Link to={"/main/profile"} style={{ textDecoration: "none", color: "white" }}>
                <span className="menu-category-text">profile</span>
              </Link>
            </li>
            <li className="menu-category">
              <Link to={"/main/words"} style={{ textDecoration: "none", color: "white" }}>
                <span className="menu-category-text">wordlist</span>
              </Link>
            </li>
            <li className="menu-category">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <span className="menu-category-text" onClick={handleLogout}>logout</span>
              </Link>
            </li>
            <label htmlFor="menu-toggle" className="close-btn">&times;</label>
          </ul>
        </nav>
      </div>
    </div>
  );
};


export default Header