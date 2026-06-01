import Cars from "./components/Cars";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import IntroSection from "./components/IntroSection";
import RentalSteps from "./components/RentalSteps";
import Carousel from "./components/Reviews";
import ScrollTop from "./components/ScrollTop";

function App() {
  return (
    <div className="min-w-full min-h-dvh bg-primary font-Poppins scroll-smooth">
      <Header />
      <IntroSection />
      <Cars />
      <RentalSteps />
      <Faq />
      <Carousel />
      <Footer />
      <ScrollTop />
    </div>
  );
}
export default App;
