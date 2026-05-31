import Cars from "./components/Cars";
import Header from "./components/Header";
import IntroSection from "./components/IntroSection";
import RentalSteps from "./components/RentalSteps";

function App() {
  return (
    <div className="w-full min-h-dvh bg-primary font-Poppins">
      <Header />
      <IntroSection />
      <Cars />
      <RentalSteps />
    </div>
  );
}
export default App;
