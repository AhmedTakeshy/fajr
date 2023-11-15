import CarouselItem from '@/components/CarouselItem'
import Jobs from '@/components/Jobs';
import Services from '@/components/Services';
export default function Home() {

  return (
    <div className="relative top-[-6.5rem] w-full">
      <CarouselItem />
     <Services />
     <Jobs />
    </div>
  );
}
