import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useMockBlogData } from '../hooks/useMockBlogData';
import { SliderControls } from './SliderControls';
import type { Slide } from '../types';

const TRANSITION_DURATION = 1000; // ms: 애니메이션 지속 시간

const HeroSlider: React.FC = () => {
  const slides = useMockBlogData();
  const [currentIndex, setCurrentIndex] = useState(0);
  // 이전 인덱스를 추적하여 현재 슬라이드에 '퇴장' 애니메이션 적용
  const [prevIndex, setPrevIndex] = useState(0); 
  // 애니메이션 진행 상태: 'idle' | 'transitioning'
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const autoPlayTimerRef = useRef<number | null>(null);

  const clearAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
  }, []);

  // changeSlide 로직 수정: 애니메이션 상태 추가
  const changeSlide = useCallback((newIndex: number) => {
    if (newIndex === currentIndex || isTransitioning) return;
    
    clearAutoPlay();
    setIsTransitioning(true); // 전환 시작
    setPrevIndex(currentIndex); // 현재 슬라이드를 이전 슬라이드로 저장
    
    // TRANSITION_DURATION 후에 새 슬라이드로 변경 및 전환 상태 해제
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, TRANSITION_DURATION); 
    
  }, [currentIndex, isTransitioning, clearAutoPlay]);

  // 나머지 탐색 함수는 changeSlide를 호출하므로 변경 불필요
  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    changeSlide(newIndex);
  }, [currentIndex, slides.length, changeSlide]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    changeSlide(newIndex);
  }, [currentIndex, slides.length, changeSlide]);

  const goToSlide = (slideIndex: number) => {
    changeSlide(slideIndex);
  };
  
  // 자동 재생
  useEffect(() => {
    if (!isTransitioning) {
      autoPlayTimerRef.current = window.setTimeout(goToNext, 5000);
    }
    return clearAutoPlay;
  }, [currentIndex, goToNext, clearAutoPlay, isTransitioning]);

  if (!slides || slides.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="w-full h-full">
        {slides.map((slide: Slide, slideIndex: number) => {
          const theme = slide.theme || 'dark';
          const isLight = theme === 'light';
          
          const isCurrent = slideIndex === currentIndex;
          const isExiting = isTransitioning && slideIndex === prevIndex;
          
          let slideClasses = 'absolute top-0 left-0 w-full h-full ease-in-out z-0';

          if (isCurrent) {
            // 현재 슬라이드는 항상 최상위에 위치하며, 전환 중이 아닐 때만 렌더링 됩니다.
            // 전환 중에는 애니메이션이 완료될 때까지 보이지 않도록 합니다.
            slideClasses += ' opacity-100 z-10'; 
          } else if (isExiting) {
            // 퇴장 슬라이드에 원형 확대 마스크 애니메이션 적용
            // isTransitioning 동안만 opacity-100, 원형 마스크 적용
            slideClasses += ` opacity-100 z-20 transition-[clip-path] duration-${TRANSITION_DURATION} ease-in-out 
                             clip-path-circle-start ${isTransitioning ? 'clip-path-circle-end' : ''}`;
          } else {
            // 나머지 슬라이드는 숨김
            slideClasses += ' opacity-0';
          }
          
          // isCurrent가 아니더라도 전환 중에는 이전 슬라이드와 다음 슬라이드가 모두 보일 수 있어야 함
          // (currentIndex는 애니메이션 완료 후에만 업데이트되므로, isCurrent는 다음 슬라이드에 적용됩니다.)
          if (isTransitioning && slideIndex === currentIndex) {
              slideClasses = 'absolute top-0 left-0 w-full h-full opacity-100 z-10';
          }


          return (
            <div
              key={slide.id}
              className={slideClasses}
              style={{ transitionDuration: isExiting ? `${TRANSITION_DURATION}ms` : '0ms' }}
              aria-hidden={!isCurrent}
            >
              {/* 슬라이드 내용 (이전 코드와 동일) */}
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.imageUrl})` }}
              />
              {isLight 
                  ? <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-20" /> 
                  : <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
              }
              
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start p-8 md:p-16 lg:p-24 z-30">
                <div className="max-w-2xl text-left">
                    <h2 className={`font-gmarket text-4xl-mobile md:text-5xl font-bold mb-4 leading-tight transition-all duration-700 ease-out ${
                        isLight ? 'text-gray-900' : 'text-white'
                        } ${
                        isCurrent ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-5'
                        }`}>
                      {slide.title}
                    </h2>
                    <p className={`text-base md:text-lg mb-8 max-w-2xl transition-all duration-700 ease-out ${
                        isLight ? 'text-gray-700' : 'text-gray-200'
                        } ${
                        isCurrent ? 'opacity-100 translate-y-0 delay-[650ms]' : 'opacity-0 translate-y-5'
                        }`}>
                      {slide.description}
                    </p>
                    <a
                      href={slide.link}
                      className={`inline-block font-bold py-3 px-8 rounded transition-all duration-700 ease-out ${
                        isLight ? 'bg-gray-800 text-white hover:bg-black' : 'bg-pink-600 text-white hover:bg-pink-700'
                        } ${
                        isCurrent ? 'opacity-100 translate-y-0 delay-[800ms]' : 'opacity-0 translate-y-5'
                        }`}
                    >
                      자세히보기
                    </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <SliderControls
        goToPrevious={goToPrevious}
        goToNext={goToNext}
        goToSlide={goToSlide}
        slidesCount={slides.length}
        currentIndex={currentIndex}
      />
    </div>
  );
};

export default HeroSlider;
