import ArchivePage from './pages/ArchivePage';
import AuthPage from './pages/AuthPage';
import ChattingPage from "./chatting/ChattingPage";

import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

function AppContent() {
    const navigate = useNavigate();
    const location = useLocation();
    const hideMenu = (location.pathname === "/login" || location.pathname === "/Login" || location.pathname === "/signup");

    return (
        <div className="App"
             style={{
                 display: "flex",
                 height: "100%"
             }}
        >
            <div className="screen"
                 style={{
                     height: "100%",
                     flex: 1,
                     overflowY: "auto"
                 }}
            >
                <Routes>
                    <Route path="/login" element={<AuthPage type="login" />} />
                    <Route path="/signup" element={<AuthPage type="signup" />} />

                    <Route path="/" element={<ArchivePage />} />
                </Routes>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
