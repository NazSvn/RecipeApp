import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar';
import Home from './pages/home';
import Favorites from './pages/Favorites';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/favorites'
          element={<Favorites />}
        />
        <Route path='/Details/:id' />
      </Routes>
    </>
  );
}

export default App;
