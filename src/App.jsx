import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ClubDetails from './pages/ClubDetails';

function App() {

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">Brawl Dashboard</Link>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/club/:tag" element={<ClubDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
