
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { MenuIcon } from './icons/MenuIcon';

const Logo: React.FC = () => (
  <div className="text-white text-center">
    <h1 className="inline-block text-3xl font-black tracking-widest border-2 border-white px-2 py-1">A14U</h1>
    <p className="text-xs tracking-tighter mt-1">Aesthetic Intelligence make us to think beyond human</p>
  </div>
);


const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-8 text-white">
      <div className="container mx-auto grid grid-cols-3 items-center">
        <div /> {/* Left column for spacing */}
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="flex items-center justify-end space-x-6">
          <button aria-label="Search" className="text-white hover:text-gray-300 transition-colors">
            <SearchIcon />
          </button>
          <button aria-label="Menu" className="text-white hover:text-gray-300 transition-colors">
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
