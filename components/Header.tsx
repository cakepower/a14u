

import React, { useState } from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { MenuIcon } from './icons/MenuIcon';

const Logo: React.FC = () => (
  <div className="text-white text-center font-gmarket">
    <h1 className="inline-block text-3xl font-bold tracking-widest border-2 border-white px-2 py-1">A14U</h1>
    <p className="text-xs tracking-tighter mt-1">Aesthetic Intelligence make us to think beyond human</p>
  </div>
);


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-8 text-white">
      <div className="container mx-auto grid grid-cols-3 items-center">
        <div /> {/* Left column for spacing */}
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="flex items-center justify-end">
         
          <div className="relative">
            <button 
              aria-label="Menu" 
              className="text-white hover:text-gray-300 transition-colors focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg py-2 z-50 animate-fade-in-down">
                <a 
                  href="https://www.cakepower.net/blog/" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-600 transition-colors"
                >
                  Home
                </a>
                <a 
                  href="https://www.cakepower.net/post/jongho-lees-cv-69700c/" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-600 transition-colors"
                >
                  About Me
                </a>
                <a 
                  href="https://www.cakepower.net/category/About_insights/" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-600 transition-colors"
                >
                  AI Project News
                </a>
                <a 
                  href="https://www.cakepower.net/category/About_aesthetic/" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-600 transition-colors"
                >
                  Research Projects
                </a>
                                <a 
                  href="https://www.cakepower.net/post/10%EC%9B%94%EA%B3%BC-11%EC%9B%94-%EC%A0%84%EC%8B%9C-%EC%9D%BC%EC%A0%95-efb810/" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-600 transition-colors"
                >
                  Exhibitions
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
