import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ClubDetails from './pages/ClubDetails';
import { CLUBS, API_KEY } from './config';
import { brawlStarsApi } from './services/brawlStarsApi';

function App() {
  // Force use of API_KEY from config, ignoring localStorage to prevent issues with old keys
  const [apiKey] = useState(API_KEY);



  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">Brawl Dashboard</Link>
        </nav>

        <main className="container">
          {!apiKey ? (
            <div className="error mt-4">
              Please enter your Brawl Stars API Key in the top right corner to view data.
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Dashboard apiKey={apiKey} />} />
              <Route path="/club/:tag" element={<ClubDetails apiKey={apiKey} />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
