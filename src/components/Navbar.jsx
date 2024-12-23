import { NavLink } from 'react-router-dom';
import SearchEngine from './SearchEngine';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx';
import { GlobalContext } from '../context/GlobalContext';
import { MIN_NAV_WINDOW_WIDTH } from '../services/minNavWidth';

const NavBar = () => {
  const { setShowingSearch, inputRef, toggleSearchRef, setInputValue } =
    useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(true);
  const [atTop, setAtTop] = useState(true);

  const burgerNavRef = useRef(null);
  const prevScrollY = useRef(window.scrollY);

  const handleWheel = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (isShown && !isOpen) {
      if (currentScrollY > prevScrollY.current) {
        setIsShown(false);
        setShowingSearch(false);
        setInputValue('');
        inputRef.current.blur();
        toggleSearchRef.current.blur();
      } else {
        setIsShown(true);
      }
    }

    if (currentScrollY === 0) {
      setAtTop(true);
    } else {
      setAtTop(false);
    }

    prevScrollY.current = currentScrollY;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleFocusTrap = useCallback(() => {
    const focusableElements = Array.from(
      document.querySelectorAll(
        'a, input, textarea, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !burgerNavRef.current.contains(el));

    if (isOpen) {
      focusableElements.forEach((el) => el.setAttribute('tabindex', '-1'));
    } else {
      focusableElements.forEach((el) => el.removeAttribute('tabindex'));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MIN_NAV_WINDOW_WIDTH) {
        document.body.classList.remove('no-scroll');
        setIsOpen(false);
      }
    };

    handleFocusTrap();

    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleWheel);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleWheel);
      handleFocusTrap();
    };
  }, [handleFocusTrap, handleWheel, isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (burgerNavRef.current && !burgerNavRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed left-0 right-0 z-50 bg-gradient-to-r from-purple to-purple-dark px-3 text-white shadow-md ${!isShown && '-translate-y-full'} delay-75 duration-300 ${atTop || !isShown ? 'shadow-none' : 'shadow-md'} backdrop-blur`}
    >
      <div className="mx-auto flex items-center gap-3 p-2 xs:justify-between sm:max-w-4xl">
        <h1 className="mr-auto">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              `relative px-4 py-2 text-2xl font-medium outline-none transition-all duration-300 ${
                isActive
                  ? 'bg-purple-light/20 text-accent-lime aria-[current]:text-accent-lime'
                  : 'text-white hover:bg-purple-light/10'
              } rounded-sm after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-accent-lime after:transition-transform hover:after:scale-x-100 focus-visible:text-accent-lime focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-purple`
            }
          >
            Home
          </NavLink>
        </h1>

        <SearchEngine />

        <button
          onClick={toggleMenu}
          className="z-50 p-2 md:hidden"
          aria-expanded={isOpen}
          aria-controls="burgerNav"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <RxCross2 className="h-6 w-6" />
          ) : (
            <RxHamburgerMenu className="h-6 w-6" />
          )}
        </button>

        <ul className="hidden gap-3 md:flex">
          <li>
            <NavLink
              to={'/searchResults'}
              aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              className={({ isActive }) =>
                `relative px-4 py-2 outline-none transition-all duration-300 ${
                  isActive
                    ? 'bg-purple-light/20 text-accent-lime aria-[current]:text-accent-lime'
                    : 'text-white hover:bg-purple-light/10'
                } rounded-sm after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-accent-lime after:transition-transform hover:after:scale-x-100 focus-visible:text-accent-lime focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-purple`
              }
            >
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/favorites'}
              aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
              className={({ isActive }) =>
                `relative px-4 py-2 outline-none transition-all duration-300 ${
                  isActive
                    ? 'bg-purple-light/20 text-accent-lime aria-[current]:text-accent-lime'
                    : 'text-white hover:bg-purple-light/10'
                } rounded-sm after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-accent-lime after:transition-transform hover:after:scale-x-100 focus-visible:text-accent-lime focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-purple`
              }
            >
              Favorites
            </NavLink>
          </li>
        </ul>
        <div
          id="burgerNav"
          ref={burgerNavRef}
          className={`fixed right-0 top-0 z-40 h-dvh w-96 content-center bg-gray-900 transition-all duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          aria-hidden={!isOpen}
        >
          {isOpen && (
            <ul className="flex flex-col items-center gap-5 p-2 md:hidden">
              <li>
                <NavLink
                  to={'/searchResults'}
                  aria-current={({ isActive }) =>
                    isActive ? 'page' : undefined
                  }
                  className={({ isActive }) =>
                    `relative flex justify-center px-4 py-2 outline-none transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-light/20 text-accent-lime aria-[current]:text-accent-lime'
                        : 'text-white hover:bg-purple-light/10'
                    } rounded-sm after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-accent-lime after:transition-transform hover:after:scale-x-100 focus-visible:text-accent-lime focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-purple`
                  }
                  onClick={toggleMenu}
                >
                  Recipes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/favorites'}
                  aria-current={({ isActive }) =>
                    isActive ? 'page' : undefined
                  }
                  className={({ isActive }) =>
                    `relative flex justify-center px-4 py-2 outline-none transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-light/20 text-accent-lime aria-[current]:text-accent-lime'
                        : 'text-white hover:bg-purple-light/10'
                    } rounded-sm after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-accent-lime after:transition-transform hover:after:scale-x-100 focus-visible:text-accent-lime focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:ring-offset-2 focus-visible:ring-offset-purple`
                  }
                  onClick={toggleMenu}
                >
                  Favorites
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
