import HeroScroll from "./HeroScroll";
import FeatureSection from "./FeatureSection";
import Footer from "./Footer";
function LandingPage() {
  return (
    <div className="max-h-screen w-auto bg-black-100">
      <HeroScroll />
      <FeatureSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
