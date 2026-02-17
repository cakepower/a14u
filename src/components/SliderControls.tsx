import React from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface SliderControlsProps {
  goToPrevious: () => void;
  goToNext: () => void;
  goToSlide: (index: number) => void;
  slidesCount: number;
  currentIndex: number;
}

export const SliderControls: React.FC<SliderControlsProps> = ({
  goToPrevious,
  goToNext,
  goToSlide,
  slidesCount,
  currentIndex,
}) => {
  return (
    <>
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute top-[70%] md:top-1/2 left-4 md:left-8 -translate-y-1/2 z-20 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-[70%] md:top-1/2 right-4 md:right-8 -translate-y-1/2 z-20 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRightIcon />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-10 left-8 md:left-16 lg:left-24 z-20 flex space-x-3">
        {Array.from({ length: slidesCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-pink-600 scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};