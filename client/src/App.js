import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import TowerOfHanoi from './components/TowerOfHanoi';
import Leaderboard from './components/Leaderboard';
import Home from './components/Home';
import NotFoundPage from './components/NotFoundPage';
import { useState } from 'react';

const PriveRoute = ({ isAuthentication, ...props }) => {
  return isAuthentication ? <Outlet /> : <Navigate replace to='/Signup' />
}

function App() {

  const [isAuthentication, isUserAuthentication] = useState(false);


  return (
    <BrowserRouter>
      <Routes>

      <Route path='Signup' element={<Signup isUserAuthentication={isUserAuthentication} />} />


      <Route path='/' element={<PriveRoute isAuthentication={isAuthentication} />}>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<TowerOfHanoi />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;