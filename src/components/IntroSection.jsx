import CarsIconSlider from "./CarsIconsSlider";
import { isTablet, isDesktop } from "react-device-detect";

function IntroSection({ isDarkMode, language }) {
  return (
    <section className="flex flex-col">
      <div
        className={`flex flex-col md:items-center ${language === "en" ? "md:flex-row" : "md:flex-row-reverse"}`}
      >
        <div
          style={{
            direction: `${language === "en" ? "ltr" : "rtl"}`,
          }}
          className={`mt-5 md:mt-0 p-5 md:w-1/2 ${language === "en" ? "text-left" : "text-right"}`}
        >
          <span className="inline-block py-1 px-3 text-xs bg-accent text-secondary rounded-full ">
            {language === "en"
              ? "Car rental in Laayoune"
              : "وكالة كراء السيارة بالعيون"}
          </span>
          <h1
            className={`text-2xl font-semibold leading-relaxed md:text-3xl lg:text-4xl mt-6 ${isDarkMode ? "text-ternary" : "text-secondary"} `}
          >
            {language === "en"
              ? "Your next great escape with reliable vehicles, effortless booking, and exceptional service"
              : "ابحث عن رحلتك القادمة بثقة وراحة كاملة، واختَر السيارة التي تناسب أسلوبك"}{" "}
            <span className="italic font-normal text-accent">
              {language === "en" ? "starts here" : "من هنا"}
              {"."}
            </span>
          </h1>
          <p
            className={`mt-4 leading-6 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            {language === "en"
              ? "The car you want, exactly when you need it. Browse our real-time inventory and get behind the wheel in minutes."
              : "السيارة التي تريدها، في اللحظة التي تحتاجها بالضبط. تصفح أسطولنا المتاح في الوقت الفعلي وانطلق خلف المقود في غضون دقائق قليلة."}
          </p>
          <div className="mt-10">
            <a
              href="#cars-section"
              className={`py-2.5 px-8 rounded-full hover:bg-accent hover:text-secondary duration-200 ease-linear cursor-pointer ${isDarkMode ? "bg-primary text-secondary" : "bg-secondary text-ternary"}`}
            >
              {language === "en" ? "Reserve now" : "احجز سيارتك"}
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
