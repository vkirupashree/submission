import React from 'react';

const Layout = ({ children }) => (
  <div className="layout">
    {/* Navigation and header can go here */}
    <main>{children}</main>
  </div>
);

export default Layout;
