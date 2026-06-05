import { useEffect, useState } from "react";
import Cars from "./components/Cars";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import IntroSection from "./components/IntroSection";
import RentalSteps from "./components/RentalSteps";
import Carousel from "./components/Reviews";
import ScrollTop from "./components/ScrollTop";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("mode")),
  );

  function handleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }

  useEffect(() => {
    localStorage.setItem("mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      className={`min-w-full min-h-dvh ${isDarkMode ? "bg-slate-950" : "bg-primary"} font-Poppins scroll-smooth duration-300 ease-linear`}
    >
      <Header onDarkMode={handleDarkMode} isDarkMode={isDarkMode} />
      <IntroSection isDarkMode={isDarkMode} />
      <Cars isDarkMode={isDarkMode} />
      <RentalSteps isDarkMode={isDarkMode} />
      <Faq isDarkMode={isDarkMode} />
      <Carousel isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
      <ScrollTop />
    </div>
  );
}
export default App;
