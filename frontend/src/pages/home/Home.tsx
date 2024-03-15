import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import "./Home.css";
import logo from "../../assets/images/logo-mywordbooks.png";

const Home = () => {
  return (
    <Container className="text-center">
      <h1 className="homeTitle display-4 fw-bold">MY WORDBOOKS</h1>
      <img src={logo} alt="my-wordbooks-logo" className="homeLogo" />
      <p className="fs-4">分からない単語と意味を入力して、自分だけのオリジナル単語帳を作ろう！</p>
      <p className="fs-4">Create your own original wordbooks by entering words and meanings you don't understand!</p>
      <div className="d-flex justify-content-center mt-4">
        <Link to="/login" className="mx-2">
          <Button variant="danger" size="lg">LOGIN</Button>
        </Link>
        <Link to="/register" className="mx-2">
          <Button variant="danger" size="lg">SIGN UP</Button>
        </Link>
      </div>
    </Container>
  );
}

export default Home;