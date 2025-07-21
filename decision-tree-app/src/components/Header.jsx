import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  const links = [
    { href: '#home', label: 'خانه' },
    { href: '#about', label: 'درباره ما' },
    { href: '#services', label: 'خدمات' },
    { href: '#products', label: 'محصولات' },
    { href: '#projects', label: 'پروژه‌ها' },
    { href: '#contact', label: 'تماس با ما' },
  ];

  return (
    <header className="header" dir="rtl">
      <div className="logo-placeholder">لوگو</div>
      <button className="toggle" onClick={toggleMenu} aria-label="منو">
        &#9776;
      </button>
      <nav className={open ? 'open' : ''}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
