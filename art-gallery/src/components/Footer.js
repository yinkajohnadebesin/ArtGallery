import React from 'react';

const Footer = () => (
  <footer className="bg-dark text-light py-3 mt-5">
    <div className="container text-center">
      <small>
        &copy; {new Date().getFullYear()} Art Gallery. All rights reserved. <br />
        Designed by <strong>Yinka Adebesin</strong>.
      </small>
    </div>
  </footer>
);

export default Footer;
