import CTA from "@/components/CTA";
import Features from "@/components/Feature";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";


export default function Home() {
   return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
