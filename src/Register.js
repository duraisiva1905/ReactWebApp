import { Button } from "react-bootstrap";
import "./App.css";
import "./Register.css";
import logo from "./login.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (name !== "" && email !== "" && password !== "") {
      try {
        // Make an HTTP POST request to your backend signup API
        const response = await axios.post("http://localhost:5000/user/signup", {
          name,
          email,
          password, // Send the password as 'password' in the request body
        });

        console.log(response.data); // This can be a success message from your backend

        // Redirect the user to the login page after successful registration
        navigate("/login");
      } catch (error) {
        console.error(error.response.data);
        window.alert("An error occurred during registration");
      }
    } else {
      window.alert("Please enter all fields with valid details");
    }
  };

  return (
    <div className="Register-container">
      <div className="Register-form">
        <img src={logo} alt="Logo" className="logo-img" />
        <h2>Welcome to My Registration Form</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              id="name"
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              required
              placeholder="Enter your password"
            />
          </div>

          <Button
            className="boot-btn w-100"
            type="submit"
            onClick={handleRegister}
          >
            Register
          </Button>

          <hr />
          <Link to="/login">
            <Button className="boot-btn w-100" type="submit">
              Login
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Register;
