import dynamic from 'next/dynamic';
import Posts from '@/components/main/Posts';
import Services from '@/components/main/Services';
import Testimonials from '@/components/main/Testimonials';
const CarouselItem = dynamic(() => import('@/components/main/CarouselItem'));


export default function Home() {
  return (
    <main className="relative top-[-10.1rem] md:top-[-4.7rem] flex-grow">
      <CarouselItem />
      <Services />
      <Posts />
      <Testimonials />
    </main>
  );
}
