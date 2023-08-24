import { DarkMode, LightMode, Menu } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
      setIsDarkTheme(true);
    } else if (storedTheme === 'light') {
      setIsDarkTheme(false);
    } else {
      const userPreference = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDarkTheme(userPreference);
      localStorage.setItem('theme', userPreference ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem('theme', isDarkTheme ? 'light' : 'dark');
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleNavLinkClick = () => {
    setShowMenu(false);
  };
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [isDarkTheme]);

  return (
    <nav>
      <Link
        className="logo"
        to={'/'}
      >
        Northwind API
      </Link>
      <div className="flex items-center space-x-2">
        <div className="links">
          <NavLink
            to={'/customers'}
            onClick={handleNavLinkClick}
          >
            Customers
          </NavLink>
          <Link
            to={null}
            onClick={handleNavLinkClick}
          >
            Products
          </Link>
          <Link
            to={null}
            onClick={handleNavLinkClick}
          >
            Users
          </Link>
          <button onClick={toggleTheme}>
            {isDarkTheme ? <DarkMode /> : <LightMode />}
          </button>
        </div>
        <button
          onClick={handleMenuClick}
          className="text-light-text dark:text-dark-text md:hidden"
        >
          <Menu />
        </button>
      </div>
      {showMenu && (
        <div className="mobile-links">
          <NavLink
            to={'/customers'}
            onClick={handleNavLinkClick}
          >
            Customers
          </NavLink>
          <Link
            to={null}
            onClick={handleNavLinkClick}
          >
            Products
          </Link>
          <Link
            to={null}
            onClick={handleNavLinkClick}
          >
            Users
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
