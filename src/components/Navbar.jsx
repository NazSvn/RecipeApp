import { NavLink } from 'react-router-dom';
import SearchEngine from './SearchEngine';

const NavBar = () => {
  return (
    <nav className='fixed left-0 right-0 bg-slate-700 z-50'>
      <div className='flex flex-col sm:flex-row p-2 gap-3 mx-auto items-center sm:max-w-4xl justify-between sm:h-20'>
        <NavLink to={'/'}>
          <h1 className='text-2xl font-medium '>Recipes</h1>
        </NavLink>

        <SearchEngine />
        <ul className='flex gap-3'>
          <li>
            <NavLink to={'/'}>Recipes</NavLink>
          </li>
          <li>
            <NavLink to={'/favorites'}>Favorites</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
