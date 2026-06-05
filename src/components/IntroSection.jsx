import CarsIconSlider from "./CarsIconsSlider";
import { isTablet, isDesktop } from "react-device-detect";

function IntroSection({ isDarkMode }) {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col md:flex-row  md:items-center">
        <div className="mt-5 md:mt-0 p-5 md:w-1/2">
          <span className="inline-block py-1 px-3 text-xs bg-accent text-secondary rounded-full">
            Location de voitures à Laayoune
          </span>
          <h1
            className={`text-2xl font-semibold md:text-4xl lg:text-5xl mt-6 ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            Votre prochaine grande évasion{" "}
            <span className="italic font-normal text-accent">
              commence ici.
            </span>
          </h1>
          <p
            className={`mt-4 leading-6 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            La voiture que vous voulez, au moment exact où vous en avez besoin.
            Consultez notre inventaire en temps réel et prenez le volant en
            quelques minutes.
          </p>
          <div className="mt-10">
            <a
              href="#cars-section"
              className={`py-2.5 px-8 rounded-full hover:bg-accent hover:text-secondary duration-200 ease-linear cursor-pointer ${isDarkMode ? "bg-primary text-secondary" : "bg-secondary text-ternary"}`}
            >
              Résérver maintenant
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative">
          <img
            className="w-full  mask-[url('../src/assets/images/splash_2.png')] mask-cover mask-no-repeat mask-center"
            src="../src/assets/images/car_2.webp"
            alt="car"
          />
        </div>
      </div>
      <div className="hidden md:block mt-10 relative">
        <CarsIconSlider />
        <div
          className={`h-10 absolute bg-linear-to-l ${isDarkMode ? "from-slate-950" : "from-white"} to-transparent top-0 right-0 w-1/2`}
        ></div>
        <div
          className={`h-10 absolute bg-linear-to-r ${isDarkMode ? "from-slate-950" : "from-white"} to-transparent top-0 left-0 w-1/2`}
        ></div>
      </div>
    </section>
  );
}

export default IntroSection;
