import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
function Header() {
  const [isMenuShown, setIsMenuShown] = useState(false);

  const [isDarkMode, setDarkMode] = useState(false);

  function handleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  return (
    <header className="sticky z-50 top-0 left-0 bg-white/15 backdrop-blur-3xl h-14 md:h-16  flex items-center justify-between p-5 shadow-xs">
      <div className="flex-1 ">
        <img
          src="../../src/assets/images/logo.png"
          alt="logo"
          className="lg:w-36 w-22 md:w-26"
        />
      </div>
      <div
        className={`md:hidden z-50 fixed top-0 left-0 duration-200 ease-linear w-2/3  bg-primary    min-h-screen p-1 ${isMenuShown ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="py-2 px-3 flex items-center  justify-end font-nevera">
          <X
            onClick={() => setIsMenuShown(false)}
            className="bg-red-400 p-1 rounded-full hover:bg-red-600 duration-200 ease-linear cursor-pointer"
            size={28}
          />
        </div>

        <ul className="text-sm h-[calc(100vh-70px)]  w-full flex flex-col justify-center  gap-3 p-4 ">
          <li className="bg-ternary text-secondary py-2.5 px-3 rounded-full text-center hover:bg-secondary hover:text-ternary duration-200 ease-linear">
            <a href="#cars-section">Notre Flotte</a>
          </li>
          <li className="bg-ternary text-secondary py-2.5 px-3 rounded-full text-center hover:bg-secondary hover:text-ternary duration-200 ease-linear">
            <a href="#rental-steps">Etapes</a>
          </li>
          <li className="bg-ternary text-secondary py-2.5 px-3 rounded-full text-center hover:bg-secondary hover:text-ternary duration-200 ease-linear">
            <a href="#faqs">Faq</a>
          </li>
          <li className="bg-ternary text-secondary py-2.5 px-3 rounded-full text-center hover:bg-secondary hover:text-ternary duration-200 ease-linear">
            <a href="#footer">Contact</a>
          </li>
        </ul>
      </div>
      <div>
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setIsMenuShown(true)}
          size={32}
        />
      </div>
      <div className="hidden md:flex justify-center items-center flex-2 whitespace-nowrap">
        <ul className="flex justify-center gap-5 lg:gap-8  lg:text-sm text-xs ">
          <li className=" text-secondary   text-center  hover:text-accent duration-200 ease-linear uppercase">
            <a href="#cars-section">Notre Flotte</a>
          </li>
          <li className=" text-secondary  text-center  hover:text-accent duration-200 ease-linear uppercase">
            <a href="#rental-steps">Etapes</a>
          </li>
          <li className=" text-secondary  text-center  hover:text-accent duration-200 ease-linear uppercase">
            <a href="#faqs">Faq</a>
          </li>
          <li className=" text-secondary   text-center  hover:text-accent duration-200 ease-linear uppercase">
            <a href="#footer">Contact</a>
          </li>
        </ul>
      </div>
      <div className="hidden md:flex  flex-1 text-xs lg:text-sm justify-end gap-5 lg:gap-3">
        <div className="flex items-center gap-6 lg:gap-3">
          <span className="inline-flex items-center gap-2.5">
            <img
              className="w-5"
              src="../../src/assets/images/france.png"
              alt="france flag"
            />
            Français
          </span>
          <span className="inline-flex items-center gap-2.5">
            <img
              className="w-5"
              src="../../src/assets/images/morocco.png"
              alt="morocco flag"
            />
            العربية
          </span>
        </div>
        <div
          onClick={handleDarkMode}
          className={`${isDarkMode ? "bg-accent" : "bg-secondary"} duration-500 ease-linear w-12 h-6 rounded-full p-0.5 cursor-pointer `}
        >
          <div
            className={`${isDarkMode ? "bg-secondary translate-x-6" : "bg-primary translate-x-0"} h-full aspect-square rounded-full duration-500 ease-linear`}
          ></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
