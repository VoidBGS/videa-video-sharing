import "./style/general.css";
import React, {useState} from 'react';
import Homepage from "./pages/homepage/Homepage";
import VideoPage from "./pages/videopage/Videopage";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Container from "./components/container/Container";
import ToDo from "./pages/ToDo";
import Login from '../src/pages/loginpage/LoginPage';

function App() {
  const [token, setToken] = useState("");
  const storageToken = sessionStorage.getItem('videa-token');

  if(!storageToken) {
    return <Login setToken={setToken}/>
  }
  return (
    <div className="App">
      <Sidebar />
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/ToDo" element={<ToDo/>} />
          <Route path="/video/:id" element={<VideoPage />} />
        </Routes>
      </Container>
    </div>

  );
}

export default App;
