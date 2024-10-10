import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import TheStorySoFar from './pages/TheStorySoFar';
import CharacterPage from './pages/Characters'
import Encounter from './pages/Encounter';

const App: React.FC = () => {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/StorySoFar" element={<TheStorySoFar />} />
          <Route path="/characters" element={<CharacterPage />} />
          <Route path="/encounter" element={<Encounter />} />     
        </Routes>
      </Router>
  );
};

export default App;

