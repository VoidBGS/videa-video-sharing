import React from 'react'

import Landing from './pages/Landing';
import Navbar from './components/navbar/Navbar';

import {
    BrowserRouter as Router,
    Routes,
    Route,

} from "react-router-dom";

const CreateRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />}></Route>
            </Routes>
        </Router>
    )
};

export default CreateRouter;