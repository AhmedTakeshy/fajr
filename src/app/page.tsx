import CarouselItem from '@/components/CarouselItem'
import Jobs from '@/components/Jobs';
import Services from '@/components/Services';
import Team from '@/components/Team';
export default function Home() {

  return (
    <main className="relative top-[-11rem] md:-top-28 flex-grow">
      <CarouselItem />
      <Services />
      <Jobs />
      <Team />
    </main>
  );
}
