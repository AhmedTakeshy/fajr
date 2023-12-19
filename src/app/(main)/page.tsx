import CarouselItem from '@/components/main/CarouselItem'
import Posts from '@/components/main/Posts';
import Services from '@/components/main/Services';
import Testimonials from '@/components/main/Testimonials';



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
