import Cars from "./components/Cars";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import IntroSection from "./components/IntroSection";
import RentalSteps from "./components/RentalSteps";
import ScrollTop from "./components/ScrollTop";

function App() {
  return (
    <div className="w-full min-h-dvh bg-primary font-Poppins scroll-smooth">
      <Header />
      <IntroSection />
      <Cars />
      <RentalSteps />
      <Faq />
      <ScrollTop />
      <Footer />
    </div>
  );
}
export default App;
