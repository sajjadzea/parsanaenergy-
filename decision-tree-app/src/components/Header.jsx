import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  const links = [
    { to: '/', label: 'خانه' },
    { to: '/articles', label: 'مقالات' },
  ];

  return (
    <header className="header" dir="rtl">
      <div className="logo-placeholder">لوگو</div>
      <button className="toggle" onClick={toggleMenu} aria-label="منو">
        &#9776;
      </button>
      <nav className={open ? 'open' : ''}>
        {links.map((l) => (
          <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
