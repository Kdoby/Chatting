import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function AppContent() {

    return (
        <div className="App"
             style={{
                 display: "flex",
                 height: "100%",
             }}
        >
            <div className="screen"
                 style={{
                     height: "100%",
                     flex: 1,
                     backgroundColor: "#F8FAFC",
                 }}
            >
                <Routes>
                    <Route path="/login" element={<AuthPage type="login" />} />
                    <Route path="/signup" element={<AuthPage type="signup" />} />

                    <Route path="/" element={<HomePage type="archive"/>} />
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
