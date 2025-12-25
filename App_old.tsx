
import React from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <Header />
      <main>
        <HeroSlider />
      </main>
    </div>
  );
};

export default App;
