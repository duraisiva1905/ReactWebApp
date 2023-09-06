import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to Our Website</h1>
      <p className="landing-description">
        Dive in to our website to explore the latest technologies.
      </p>
      <div className="landing-links">
        <Link to="/login" className="landing-link">
          Login
        </Link>{" "}
        or
        <Link to="/register" className="landing-link">
          Register
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
