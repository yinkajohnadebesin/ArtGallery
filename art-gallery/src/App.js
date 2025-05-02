import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ArtGallery from './pages/ArtGallery';
import ViewArt from './pages/ViewArt';
import EditArt from './pages/EditArt';
import CreateArt from './pages/CreateArt';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<ArtGallery />} />
          <Route path="/art/:id" element={<ViewArt />} />
          <Route path="/edit/:id" element={<EditArt />} />
          <Route path="/create" element={<CreateArt />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

