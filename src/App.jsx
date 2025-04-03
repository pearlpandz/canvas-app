import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import PreviewPage from './pages/Preview';
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='preview' element={<PreviewPage />} />
            </Routes>
        </Router>
    );
}

export default App;