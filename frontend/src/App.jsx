import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import './App.css'
import EditPage from './pages/Edit';
import CreatePage from './pages/Create';
import TemplateLayout from './components/TemplateLayout';
import ListPage from './pages/List';
import TanstackProvider from './tanstack-query/Provider';

function App() {
    return (
        <TanstackProvider>
            <Router>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path='template' element={<TemplateLayout />}>
                        <Route index element={<ListPage />} />
                        <Route path='create' element={<CreatePage />} />
                        <Route path='edit/:templateId' element={<EditPage />} />
                    </Route>
                </Routes>
            </Router>
        </TanstackProvider>
    );
}

export default App;