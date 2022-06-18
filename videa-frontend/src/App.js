import "./style/general.css";
import React, { useState } from 'react';
import Homepage from "./pages/homepage/Homepage";
import VideoPage from "./pages/videopage/Videopage";
import NotFoundPage from "./pages/404page/404page";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Container from "./components/container/Container";
import ToDo from "./pages/ToDo";
import Login from '../src/pages/loginpage/LoginPage';
import GDPRPage from "./pages/gdpr/gdpr";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [token, setToken] = useState("");
  const [gdpr, setGdpr] = useState(localStorage.getItem("gdpr"));
  const storageToken = sessionStorage.getItem('videa-token');
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (!isAuthenticated) {
    return <Login setToken={setToken} />
  }

  const setGDPRCompliance = () => {
    localStorage.setItem("gdpr", true);
    setGdpr(true);
  }

  return (
    <div className="App">
      <Sidebar />
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/ToDo" element={<ToDo />} />
          <Route path="/gdpr" element={<GDPRPage />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      {!gdpr ?
        <div className='gdpr-popup'>
          <div>
            This website makes use of cookies! By using this website you agree to the <Link to="/gdpr" onClick={setGDPRCompliance}>Terms of Service.</Link>
          </div>
        </div>
        : ""}
    </div>
  );
}

export default App;
