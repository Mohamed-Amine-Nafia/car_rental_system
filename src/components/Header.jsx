import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
function Header() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  return (
    <header className="w-full flex items-center justify-between p-5">
      <div className="flex-1">
        <h2 className="font-nevera inline-flex items-center text-2xl md:text-2xl lg:text-3xl">
          RENTAL
          <img className="w-9" src="../src/assets/images/wheel.webp" alt="" />
          <span>X</span>
        </h2>
      </div>
      <div
        className={`md:hidden z-50 fixed top-0 left-0 duration-200 ease-linear overflow-hidden bg-primary  min-h-screen p-1 ${isMenuShown ? "w-full" : "w-0"}`}
      >
        <div className="p-4 flex items-center  justify-between font-nevera">
          <h2 className="text-xl  inline-flex items-center">
            RENTAL
            <img className="w-9" src="../src/assets/images/wheel.webp" alt="" />
            <span className="">X</span>
          </h2>
          <X
            onClick={() => setIsMenuShown(false)}
            className="bg-red-400 p-1 rounded-full hover:bg-accent duration-300 ease-linear cursor-pointer"
            size={28}
          />
        </div>

        <ul className="text-lg h-[calc(100vh-70px)]  w-full flex flex-col justify-center  gap-3 p-4">
          <li className="bg-ternary text-secondary py-2.5 px-3 rounded-full text-center hover:bg-secondary hover:text-ternary duration-300 ease-linear">
            <a href="#">Notre Flotte</a>
          </li>
          <li className="bg-ternary text-secondary py-2.5 px-3 rounded-full text-center hover:bg-secondary hover:text-ternary duration-300 ease-linear">
            <a href="#">Etapes</a>
          </li>
          <li className="bg-ternary text-secondary py-2.5 px-3 rounded-full text-center hover:bg-secondary hover:text-ternary duration-300 ease-linear">
            <a href="#">Faq</a>
          </li>
          <li className="bg-ternary text-secondary py-2.5 px-3 rounded-full text-center hover:bg-secondary hover:text-ternary duration-300 ease-linear">
            <a href="#">Contact</a>
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
        <ul className="flex justify-center gap-2 md:text-sm ">
          <li className="bg-ternary text-secondary py-2.5 px-5 rounded-full text-center hover:bg-secondary hover:text-ternary duration-300 ease-linear uppercase">
            <a href="#">Notre Flotte</a>
          </li>
          <li className="bg-ternary text-secondary py-2.5 px-5 rounded-full text-center hover:bg-secondary hover:text-ternary duration-300 ease-linear uppercase">
            <a href="#">Etapes</a>
          </li>
          <li className="bg-ternary text-secondary py-2.5 px-5 rounded-full text-center hover:bg-secondary hover:text-ternary duration-300 ease-linear uppercase">
            <a href="#">Faq</a>
          </li>
          <li className="bg-ternary text-secondary py-2.5 px-5 rounded-full text-center hover:bg-secondary hover:text-ternary duration-300 ease-linear uppercase">
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <div className="hidden md:flex  flex-1 text-sm justify-end ">
        <div className="inline-flex gap-1.5 items-center bg-secondary text-ternary py-2.5 px-5 rounded-full">
          <Phone size={20} />
          <span>0600000000</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
