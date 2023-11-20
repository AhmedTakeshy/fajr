import CarouselItem from '@/components/CarouselItem'
import Jobs from '@/components/Jobs';
import Services from '@/components/Services';
import Team from '@/components/Team';
export default function Home() {

  return (
    <main className="relative top-[-6.5rem] md:-top-10">
      <CarouselItem />
      <Services />
      <Jobs />
      <Team />
    </main>
  );
}
