import CarouselItem from '@/components/main/CarouselItem'
import Posts from '@/components/main/Posts';
import Services from '@/components/main/Services';
import Team from '@/components/main/Team';
export default function Home() {

  return (
    <main className="relative top-[-11rem] md:-top-28 flex-grow">
      <CarouselItem />
      <Services />
      <Posts />
      <Team />
    </main>
  );
}
