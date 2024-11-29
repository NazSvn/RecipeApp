import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <h1>Recipes</h1>

      <input
        type='text'
        name='search'
        placeholder='Search recipe'
      />
      <ul>
        <li>
          <NavLink to={'/'}>Recipes</NavLink>
        </li>
        <li>
          <NavLink to={'/favorites'}>Favorites</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
