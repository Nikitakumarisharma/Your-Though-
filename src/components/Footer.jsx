import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white text-center py-4">
      <p>© {new Date().getFullYear()} Thoughts App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
