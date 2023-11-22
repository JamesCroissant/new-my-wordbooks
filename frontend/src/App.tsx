import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Home from './pages/homePage/Home';
import Login from "./pages/loginPage/Login";
import { AuthContext } from './contexts/AuthContext';
import Register from './pages/registerPage/Register';


function App() {
  const { state } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={state.user ? <Navigate to="/main" /> : <Login />} />
          <Route path="/register" element={state.user ? <Navigate to="/main" /> : <Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
