import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './features/nav/NavBar';
import HomePage from './features/nav/HomePage';
import AppShell from './features/core-app/AppShell';
import GameView from './features/core-app/GameView';
import PlayerView from './features/core-app/PlayerView';


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='app' element={<AppShell />}>
          <Route path='players' element={<PlayerView />} />
          <Route path='games' element={<GameView />} />
        </Route>
      </Routes>
    </Router> 
  );
}

export default App;
