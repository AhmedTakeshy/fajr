import CarouselItem from '@/components/main/CarouselItem'
import Posts from '@/components/main/Posts';
import Services from '@/components/main/Services';



export default function Home() {
  return (
    <main className="relative top-[-10.1rem] md:top-[-4.7rem] flex-grow">
      <CarouselItem />
      <Services />
      <Posts />
      {/* <Team /> */}
    </main>
  );
}
