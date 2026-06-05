import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
function Header({ onDarkMode, isDarkMode }) {
  const [isMenuShown, setIsMenuShown] = useState(false);

  return (
    <header
      className={`sticky z-50 top-0 left-0 ${isDarkMode ? "bg-black/15" : "bg-white/15"} backdrop-blur-3xl h-14 md:h-16  flex items-center justify-between p-5 shadow-xs`}
    >
      <div className="flex-1 ">
        <img
          src="../../src/assets/images/logo.png"
          alt="logo"
          className={`lg:w-36 w-22 md:w-26 ${isDarkMode ? "invert-100" : "invert-0"}`}
        />
      </div>
      <div
        className={`md:hidden z-50 fixed top-0 left-0 duration-200 ease-linear w-2/3  ${isDarkMode ? "bg-gray-900" : "bg-primary"}    min-h-screen p-1 ${isMenuShown ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="py-2 px-3 flex items-center   justify-between ">
          <div className=" flex items-center flex-row-reverse  text-xs lg:text-sm  gap-3 ">
            <div className="flex items-center gap-2 lg:gap-3">
              <span
                className={`inline-flex items-center gap-1 ${isDarkMode ? "text-ternary" : "text-secondary"}`}
              >
                <img
                  className="w-5"
                  src="../../src/assets/images/france.png"
                  alt="france flag"
                />
                Fr
              </span>
              <span
                className={`inline-flex items-center gap-1 ${isDarkMode ? "text-ternary" : "text-secondary"}`}
              >
                <img
                  className="w-5"
                  src="../../src/assets/images/morocco.png"
                  alt="morocco flag"
                />
                Ar
              </span>
            </div>
            <div
              onClick={onDarkMode}
              className={`${isDarkMode ? "bg-accent " : "bg-secondary "} duration-500 ease-linear  w-12 h-6 rounded-full cursor-pointer `}
            >
              <div
                className={`${isDarkMode ? "bg-secondary  border-accent   translate-x-full" : "bg-primary translate-x-0 border-secondary"} h-full w-6 rounded-full duration-500 ease-linear border`}
              ></div>
            </div>
          </div>
          <X
            onClick={() => setIsMenuShown(false)}
            className="bg-red-400 p-0.5 rounded-full hover:bg-red-600 duration-200 ease-linear cursor-pointer"
            size={24}
          />
        </div>

        <ul
          className={`text-sm h-[calc(100vh-70px)]  w-full flex flex-col justify-center  gap-3 p-4 ${isDarkMode ? "bg-gray-900" : "bg-primary"}`}
        >
          <li
            className={`py-2.5 px-3 rounded-full text-center hover:text-accent duration-200 ease-linear ${isDarkMode ? "text-ternary" : "text-secondary"} uppercase`}
          >
            <a href="#cars-section">Notre Flotte</a>
          </li>
          <li
            className={`py-2.5 px-3 rounded-full text-center hover:text-accent duration-200 ease-linear ${isDarkMode ? "text-ternary" : "text-secondary"} uppercase`}
          >
            <a href="#rental-steps">Etapes</a>
          </li>
          <li
            className={`py-2.5 px-3 rounded-full text-center hover:text-accent duration-200 ease-linear ${isDarkMode ? "text-ternary" : "text-secondary"} uppercase`}
          >
            <a href="#faqs">Faq</a>
          </li>
          <li
            className={`py-2.5 px-3 rounded-full text-center hover:text-accent  duration-200 ease-linear ${isDarkMode ? "text-ternary" : "text-secondary"} uppercase`}
          >
            <a href="#footer">Contact</a>
          </li>
        </ul>
        <div
          className={`${isDarkMode ? "text-ternary" : "text-secondary"} flex items-center justify-center gap-1.5 text-xs pb-2`}
        >
          <span>&copy;</span>
          <span>{new Date().getFullYear()}</span>
          <span>Tous les droits résérvés</span>
        </div>
      </div>
      <div>
        <Menu
          className={`cursor-pointer md:hidden ${isDarkMode ? "text-primary" : "text-secondary"}`}
          onClick={() => setIsMenuShown(true)}
          size={32}
        />
      </div>
      <div className="hidden md:flex justify-center items-center flex-2 whitespace-nowrap">
        <ul className="flex justify-center gap-5 lg:gap-8  lg:text-sm text-xs ">
          <li
            className={` ${isDarkMode ? "text-ternary" : "text-secondary"} text-center  hover:text-accent duration-200 ease-linear uppercase`}
          >
            <a href="#cars-section">Notre Flotte</a>
          </li>
          <li
            className={` ${isDarkMode ? "text-ternary" : "text-secondary"} text-center  hover:text-accent duration-200 ease-linear uppercase`}
          >
            <a href="#rental-steps">Etapes</a>
          </li>
          <li
            className={` ${isDarkMode ? "text-ternary" : "text-secondary"} text-center  hover:text-accent duration-200 ease-linear uppercase`}
          >
            <a href="#faqs">Faq</a>
          </li>
          <li
            className={` ${isDarkMode ? "text-ternary" : "text-secondary"} text-center  hover:text-accent duration-200 ease-linear uppercase`}
          >
            <a href="#footer">Contact</a>
          </li>
        </ul>
      </div>
      <div className="hidden md:flex  flex-1 text-xs lg:text-sm justify-end gap-3 ">
        <div className="flex items-center gap-2 lg:gap-3">
          <span
            className={`inline-flex items-center gap-1 ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            <img
              className="w-5"
              src="../../src/assets/images/france.png"
              alt="france flag"
            />
            Fr
          </span>
          <span
            className={`inline-flex items-center gap-1 ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            <img
              className="w-5"
              src="../../src/assets/images/morocco.png"
              alt="morocco flag"
            />
            Ar
          </span>
        </div>
        <div
          onClick={onDarkMode}
          className={`${isDarkMode ? "bg-accent " : "bg-secondary "} duration-500 ease-linear  w-12 h-6 rounded-full cursor-pointer `}
        >
          <div
            className={`${isDarkMode ? "bg-secondary  border-accent   translate-x-full" : "bg-primary translate-x-0 border-secondary"} h-full w-6 rounded-full duration-500 ease-linear border`}
          ></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
