import { NavLink } from 'react-router-dom';
import SearchEngine from './SearchEngine';

const NavBar = () => {
  return (
    <nav className="fixed left-0 right-0 z-50 bg-slate-700">
      <div className="mx-auto flex flex-col items-center justify-between gap-3 p-2 sm:h-20 sm:max-w-4xl sm:flex-row">
        <NavLink to={'/'}>
          <h1 className="text-2xl font-medium">Home</h1>
        </NavLink>

        <SearchEngine />
        <ul className="flex gap-3">
          <li>
            <NavLink to={'/searchResults'}>Recipes</NavLink>
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
