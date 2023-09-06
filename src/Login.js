import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./style.css";
import Axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePass = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await Axios.post(`http://localhost:5000/user/login`, {
        email,
        password,
      });

      if (response.data.success) {
        // Authentication successful, perform actions (e.g., navigate to the post page).
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", response.data.token);
        navigate("/post");
      } else {
        window.alert("Enter valid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg">
      <Container fluid className="bg-container">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <div className="login-form">
              <br />
              <h2>Welcome to My Login Form</h2>
              <Form>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={changeEmail}
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={changePass}
                  />
                </Form.Group>
                <br />
                <Button
                  className="btn w-100 boot-btn"
                  variant="primary"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <hr />
                <Link to="/Register">
                  <Button className="w-100 boot-btn">Register</Button>
                </Link>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
