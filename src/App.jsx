import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar';
import Home from './pages/home';
import Favorites from './pages/Favorites'; 
import Details from './pages/Details';

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
        <Route
          path='/details/:id'
          element={<Details />}
        />
      </Routes>
    </>
  );
}

export default App;
