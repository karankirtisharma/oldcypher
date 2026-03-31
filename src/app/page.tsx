import EditorialHero from "@/components/hero/EditorialHero";
import dynamic from 'next/dynamic';

const HorizontalServices = dynamic(() => import('@/components/ui/HorizontalServices'), { ssr: true });
const FutureMask = dynamic(() => import('@/components/ui/FutureMask'), { ssr: true });
export default function Home() {
  return (
    <main className="bg-[#030303] selection:bg-cyan-400 selection:text-black">
      <EditorialHero />
      <HorizontalServices />
      <FutureMask />
      <div className="h-[50vh]" /> {/* Spacer for end of page */}
    </main>
  );
}
