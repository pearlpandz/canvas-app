import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import PreviewPage from './pages/Preview';
import './App.css'
import EditPage from './pages/Edit';
import CreatePage from './pages/Create';

function App() {
    return (
        <Router>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='template/create' element={<CreatePage />} />
                <Route path='template/edit/:templateId' element={<EditPage />} />
                <Route path='template/preview/:templateId' element={<PreviewPage />} />
            </Routes>
        </Router>
    );
}

export default App;