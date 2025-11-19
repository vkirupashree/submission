import React from 'react';

const HamburgerMenu = ({ onClick }) => (
  <button className="hamburger-menu" onClick={onClick}>
    <span />
    <span />
    <span />
  </button>
);

export default HamburgerMenu;
