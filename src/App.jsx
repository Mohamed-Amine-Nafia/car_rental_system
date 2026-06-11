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

  const [isLanguage, setIsLanguage] = useState("");

  function handleLanguageChange(value) {
    setIsLanguage(value);
  }

  function handleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }

  useEffect(() => {
    localStorage.setItem("mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      className={`min-w-full min-h-dvh ${isDarkMode ? "bg-slate-950" : "bg-primary"} ${isLanguage === "fr" ? "font-Poppins" : "font-Cairo"} scroll-smooth duration-300 ease-linear`}
    >
      <Header
        onDarkMode={handleDarkMode}
        isDarkMode={isDarkMode}
        onLanguageChange={handleLanguageChange}
        language={isLanguage}
      />
      <IntroSection isDarkMode={isDarkMode} language={isLanguage} />
      <Cars isDarkMode={isDarkMode} language={isLanguage} />
      <RentalSteps isDarkMode={isDarkMode} language={isLanguage} />
      <Faq isDarkMode={isDarkMode} language={isLanguage} />
      <Carousel isDarkMode={isDarkMode} language={isLanguage} />
      <Footer isDarkMode={isDarkMode} language={isLanguage} />
      <ScrollTop />
    </div>
  );
}
export default App;
