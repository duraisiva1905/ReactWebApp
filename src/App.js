import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Post from "./Post";
import LandingPage from "./LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
