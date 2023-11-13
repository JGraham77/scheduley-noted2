import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verify from "./views/Verify";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>Home lmao</h1>} />
                <Route path="/verify" element={<Verify />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
