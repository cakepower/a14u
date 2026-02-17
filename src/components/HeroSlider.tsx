import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useMockBlogData } from '../hooks/useMockBlogData';
import { SliderControls } from './SliderControls';
import type { Slide } from '../types';

const TRANSITION_DURATION = 1200; // ms: 애니메이션 지속 시간 (조정 가능)
const AUTO_PLAY_INTERVAL = 5000; // ms: 자동 재생 간격

const HeroSlider: React.FC = () => {
  const slides = useMockBlogData();
  const [currentIndex, setCurrentIndex] = useState(0);
  // 이전 인덱스를 추적하여 '퇴장' 애니메이션 적용
  const [prevIndex, setPrevIndex] = useState(0); 
  // 애니메이션 진행 상태: 'idle' | 'transitioning'
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const autoPlayTimerRef = useRef<number | null>(null);

  const clearAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
  }, []);

  const changeSlide = useCallback((newIndex: number) => {
    // 현재 전환 중이거나 동일한 슬라이드로 이동 시 아무것도 하지 않음
    if (isTransitioning || newIndex === currentIndex) return;
    
    clearAutoPlay(); // 자동 재생 타이머 초기화
    setIsTransitioning(true); // 전환 시작
    setPrevIndex(currentIndex); // 현재 슬라이드를 이전 슬라이드로 저장
    
    // TRANSITION_DURATION 후에 새 슬라이드로 변경 및 전환 상태 해제
    // 이 시점에 clip-path 애니메이션이 완료되어 다음 슬라이드가 완전히 보여야 합니다.
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, TRANSITION_DURATION); 
    
  }, [currentIndex, isTransitioning, clearAutoPlay]);

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
  
  // 자동 재생 useEffect: currentIndex, isTransitioning 상태 변경 시 재설정
  useEffect(() => {
    if (!isTransitioning) { // 전환 중에는 자동 재생 타이머를 설정하지 않음
      autoPlayTimerRef.current = window.setTimeout(goToNext, AUTO_PLAY_INTERVAL);
    }
    return clearAutoPlay; // 컴포넌트 언마운트 시 또는 재실행 전 타이머 클리어
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
          
          let slideClasses = 'absolute top-0 left-0 w-full h-full ease-in-out'; // 기본 클래스

          // 각 슬라이드의 z-index 및 표시/숨김 로직
          if (isExiting) {
            // 퇴장 슬라이드: z-20으로 다음 슬라이드를 덮고, clip-path 애니메이션 적용
            slideClasses += ` opacity-100 z-20 
                             transition-[clip-path] duration-${TRANSITION_DURATION} ease-in-out 
                             clip-path-circle-start ${isTransitioning ? 'clip-path-circle-end' : ''}`;
          } else if (isCurrent) {
            // 현재 활성화된 슬라이드 (애니메이션 완료 후): z-10으로 퇴장 슬라이드 아래에 위치
            // isTransitioning 동안에는 prevIndex가 여전히 이전 슬라이드를 가리키므로,
            // 이 currentIndex는 '다음' 슬라이드가 됩니다.
            slideClasses += ' opacity-100 z-10'; 
          } else {
            // 나머지 슬라이드는 숨김 (보통 opacity-0이지만, clip-path 방식에서는 그냥 두면 됨)
            // z-index를 더 낮게 설정하여 퇴장/현재 슬라이드에 영향을 주지 않도록 합니다.
            slideClasses += ' opacity-0 z-0';
          }
          
          return (
            <div
              key={slide.id}
              className={slideClasses}
              // style={{ transitionDuration: `${TRANSITION_DURATION}ms`}} // opacity 트랜지션이 아닌 clip-path 트랜지션으로 대체됨
              aria-hidden={!isCurrent}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.imageUrl})` }}
              />
              {/* 배경 오버레이 (theme에 따라 달라짐) */}
              {isLight 
                  ? <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-20" /> 
                  : <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
              }
              
              {/* 텍스트 콘텐츠 (z-index를 높여 항상 보이도록) */}
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start p-8 md:p-16 lg:p-24 z-30">
                <div className="max-w-2xl text-left">
                    {/* 타이틀 */}
                    <h2 className={`font-gmarket text-4xl-mobile md:text-5xl font-bold mb-4 leading-tight transition-all duration-700 ease-out ${
                        isLight ? 'text-gray-900' : 'text-white'
                        } ${
                        isCurrent && !isTransitioning ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-5'
                        }`}>
                      {slide.title}
                    </h2>
                    {/* 설명 */}
                    <p className={`text-base md:text-lg mb-8 max-w-2xl transition-all duration-700 ease-out ${
                        isLight ? 'text-gray-700' : 'text-gray-200'
                        } ${
                        isCurrent && !isTransitioning ? 'opacity-100 translate-y-0 delay-[650ms]' : 'opacity-0 translate-y-5'
                        }`}>
                      {slide.description}
                    </p>
                    {/* 링크 버튼 */}
                    <a
                      href={slide.link}
                      className={`inline-block font-bold py-3 px-8 rounded transition-all duration-700 ease-out ${
                        isLight ? 'bg-gray-800 text-white hover:bg-black' : 'bg-pink-600 text-white hover:bg-pink-700'
                        } ${
                        isCurrent && !isTransitioning ? 'opacity-100 translate-y-0 delay-[800ms]' : 'opacity-0 translate-y-5'
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