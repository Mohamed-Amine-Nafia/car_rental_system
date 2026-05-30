import Cars from "./components/Cars";
import Header from "./components/Header";
import IntroSection from "./components/IntroSection";

function App() {
  return (
    <div className="w-full min-h-dvh bg-primary font-Poppins">
      <Header />
      <IntroSection />
      <Cars />
    </div>
  );
}
export default App;
