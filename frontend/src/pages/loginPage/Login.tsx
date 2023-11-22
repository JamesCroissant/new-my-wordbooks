import React, { useContext, useRef } from 'react';
import { loginCall } from '../../services/actionCalls';
import { AuthContext } from '../../contexts/AuthContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Login.css";

const Login: React.FC = () => {
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const { dispatch } = useContext(AuthContext);
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current?.value || '',
        password: password.current?.value || '',
      },
      dispatch
    );
  };
  
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="loginInputEmail">Email address</Form.Label>
              <Form.Control type="email" id="loginInputEmail" required ref={email} />
              <Form.Text>We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="loginInputPassword">Password</Form.Label>
              <Form.Control type="password" id="loginInputPassword" required minLength={6} ref={password} />
            </Form.Group>

            <Button type="submit" variant="danger" className="my-3">Submit</Button>

            <div className="text-center">
              <span className="loginForgot">Forgot your Password?</span>
              <Link to="/register" className="loginRegisterLink">
                <Button variant="danger" className="my-3">SignUp</Button>
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>

  )
};

export default Login;