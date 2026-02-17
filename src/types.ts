
export interface Slide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  theme?: 'light' | 'dark';
}
