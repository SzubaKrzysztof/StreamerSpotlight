import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import NotFoundPage from './components/pages/NotFoundPage';
import Streamers from './components/pages/Streamers';
import StreamerDetail from './components/pages/StreamerDetail';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/streamers" element={<Streamers />} />
                <Route path="/streamer/:streamerId" element={<StreamerDetail />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
