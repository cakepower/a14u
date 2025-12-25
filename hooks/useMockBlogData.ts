
import { useState } from 'react';
import type { Slide } from '../types';

const mockSlides: Slide[] = [
  {
    id: 1,
    title: 'A14U, 크리에이터의 방 작가노트',
    description: "인공지능 크리에이터(AI 디자인)의 방은 어떤 모습이어야 할까?",
    imageUrl: 'https://www.cakepower.net/media/a14u/Typo_2nd.jpg',
    link: 'https://www.cakepower.net/post/106',
    theme: 'dark',
  },
  {
    id: 2,
    title: 'AI 트랜드 매거진의 탄생: 인공지능과 미적지능의 콜라보레이션',
    description: '인공지능과 인간지능은 어떻게 소통채널을 구축하게 될 것인가? ',
    imageUrl: 'https://www.cakepower.net/media/a14u/cover_02.jpg',
    link: 'https://www.cakepower.net/post/104',
    theme: 'light',
  },
  {
    id: 3,
    title: '3D 프린팅을 위한 diorama 스타일의 이미지 생성',
    description: '간단한 키워드를 입력하여 diorama 스타일의 이미지를 생성하고, 3D 입체로 변환하여 3D 프린터로 출력해봅시다.',
    imageUrl: 'https://www.cakepower.net/media/a14u/cover_03.jpg',
    link: 'https://www.cakepower.net/hello/',
    theme: 'light',
  },
  {
    id: 4,
    title: '지속 가능한 디자인: 환경을 생각하는 프로덕트 만들기',
    description: '디지털 제품이 환경에 미치는 영향을 줄이고, 사용자와 지구 모두에게 이로운 지속 가능한 디자인 원칙에 대해 논의합니다.',
    imageUrl: 'https://www.cakepower.net/media/a14u/cover_04.jpg',
    link: 'https://www.cakepower.net/category/About_the_game_design/',
    theme: 'light',
  },
  {
    id: 5,
    title: '데이터 시각화의 예술: 리듬을 시각적으로 표현하기',
    description: '효과적인 시각화는 단순한 차트 그리기를 넘어섭니다. 음악 리듬에 맞춰 감각을 시각화하는 Visual Game을 소개합니다.',
    imageUrl: 'https://www.cakepower.net/media/a14u/cover_05.jpg',
    link: 'https://www.cakepower.net/app/',
    theme: 'dark',
  },
    {
    id: 6,
    title: 'Higgsfield AI 활용하는 법',
    description: '레퍼런스 이미지로 잡지 매거진 표지까지 만드는 순서를 소개합니다.',
    imageUrl: 'https://www.cakepower.net/media/a14u/cover_07.jpg',
    link: 'https://www.cakepower.net/post/108',
    theme: 'light',
  },
];

export const useMockBlogData = () => {
  const [slides] = useState<Slide[]>(mockSlides);
  return slides;
};
