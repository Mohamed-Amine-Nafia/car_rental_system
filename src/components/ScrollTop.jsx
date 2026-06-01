import { ChevronsUp } from "lucide-react";
import { useEffect, useState } from "react";

function ScrollTop() {
  const [isScroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setScroll(false);
    document.documentElement.scrollTop = 0;
  };

  return (
    <div
      onClick={handleClick}
      className={`fixed bottom-5 right-10  gap-2  flex flex-col items-center   md:text-sm text-xs cursor-pointer`}
    >
      <div className="md:w-16 md:h-16 w-12 h-12 flex justify-center items-center bg-secondary rounded-full p-1">
        <a href="https://wa.me/212664271595" target="_blank" className="w-full">
          <img
            className="rounded-full w-full"
            src="../../src/assets/images/icons8-whatsapp.gif"
            alt="whatsapp"
          />
        </a>
      </div>
      <div
        className={` ${isScroll ? "scale-100" : "scale-0"} bg-accent text-secondary  rounded-full flex flex-col items-center justify-center   md:w-16 md:h-16 w-12 h-12  hover:bg-secondary hover:text-ternary duration-200 ease-linear `}
      >
        <ChevronsUp strokeWidth={1.5} />
        <span>Top</span>
      </div>
    </div>
  );
}

export default ScrollTop;
