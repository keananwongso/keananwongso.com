import Hero from "@/components/Hero";
import InterdependenceGraph from "@/components/Graph/InterdependenceGraph";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <InterdependenceGraph />
      <div className="h-24 md:h-32" />
      <Footer />
    </main>
  );
}
