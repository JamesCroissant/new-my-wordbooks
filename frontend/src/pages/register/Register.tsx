import React, { useRef } from 'react'
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./Register.css";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const username = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const passwordConfirmation = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.current?.value !== passwordConfirmation.current?.value) {
      passwordConfirmation.current?.setCustomValidity('Incorrect password')
    } else {
      try {
        const user = {
          username: username.current?.value,
          email: email.current?.value,
          password: password.current?.value,
        };
        await axios.post(`/api/auth/register`, user);
        navigate("/login");

      } catch (err) {
      console.log(err);
    }
  }};

    
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="registerTitle text-center mb-4">SignUp</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="registerInputUsername">UserName</Form.Label>
              <Form.Control type="text" id="registerInputUsername" className="custom-input" required ref={username} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="registerInputEmail">Email address</Form.Label>
              <Form.Control type="email" id="registerInputEmail" className="custom-input" required ref={email} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="registerInputPassword1">Password</Form.Label>
              <Form.Control type="password" id="registerInputPassword1" className="custom-input" required minLength={6} ref={password} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="registerInputPassword2">Confirm Password</Form.Label>
              <Form.Control type="password" id="registerInputPassword2" className="custom-input" required minLength={6} ref={passwordConfirmation} />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" className="mt-4" variant="danger" size="lg">
                Submit
              </Button>
            </div>

            <div className="text-center mt-4">
              <span className="m-2">Already have account?</span>
              <Link to="/login" className="login-link">
                login
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>

  )

}

export default Register;

