import React from 'react';

const Header = () => {
  return (
    <nav
      id="header"
      className="fixed w-full z-10 top-0 bg-white border-b border-gray-400"
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-4">
        <div className="pl-4 flex items-center">
          <svg
            className="h-5 pr-3 fill-current text-purple-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M0 2C0 .9.9 0 2 0h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm14 12h4V2H2v12h4c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2zM5 9l2-2 2 2 4-4 2 2-6 6-4-4z" />
          </svg>
          <a
            className="text-gray-900 text-base no-underline hover:no-underline font-extrabold text-xl"
            href="/"
          >
            Monzo Task
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
