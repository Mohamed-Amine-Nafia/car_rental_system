import { Search } from "lucide-react";
import AddNewCar from "./AddNewCar";
import { useState } from "react";

function Cars() {
  const [showAddCar, setShowAddCar] = useState(false);

  function handleClick(value) {
    setShowAddCar(value);
  }

  return (
    <div className="relative h-full w-full bg-primary rounded-md  p-8">
      <h2 className="text-xl font-semibold mt-6">Cars Collection</h2>
      <div className="flex items-center gap-4 w-full  mt-12">
        <div className="relative">
          <input
            type="text"
            placeholder="search"
            className="bg-ternary-fade rounded-md text-xs px-3 pr-14 outline-0 border-0 py-1.5"
          />
          <Search className="absolute right-2 top-1" size={18} />
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="inline-block bg-secondary text-ternary px-3 py-1.5 rounded-md hover:bg-accent hover:text-secondary transition duration-300 ease-linear cursor-pointer">
            Disponible
          </span>
          <span className="inline-block bg-secondary text-ternary px-3 py-1.5 rounded-md  hover:bg-accent hover:text-secondary transition duration-300 ease-linear cursor-pointer">
            Reservé
          </span>
          <span className="inline-block bg-secondary text-ternary px-3 py-1.5 rounded-md  hover:bg-accent hover:text-secondary transition duration-300 ease-linear cursor-pointer">
            Maintenance
          </span>
        </div>
        <div className="flex flex-1 justify-end text-[13px]">
          <button
            onClick={() => setShowAddCar(true)}
            className="inline-flex items-center bg-accent text-secondary px-3 py-1.5 rounded-md font-medium cursor-pointer hover:bg-secondary hover:text-ternary transition duration-300 ease-linear"
          >
            Ajouter une voiture
          </button>
        </div>
      </div>
      {/* Cars Container */}
      <div className="grid grid-cols-4 text-sm mt-12 gap-6">
        <div className="relative bg-ternary-fade rounded-xl min-h-52 cursor-pointer  flex flex-col justify-between">
          <img
            src="../../src/assets/images/car.webp"
            alt=""
            className="absolute w-4/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  hover:scale-110 transition duration-500 ease-linear"
          />
          <div className="flex items-center justify-between px-3 py-2">
            <img
              src="../../src/assets/images/dacia-64px.png"
              alt=""
              className="w-8"
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-secondary">
                Dacia Logan 2025
              </span>
              <span className="text-xs text-text-secondary ltr">
                123456-
                <bdi>أ</bdi>-68
              </span>
            </div>
            <span className="inline-flex bg-emerald-100 text-emerald-600 px-4 py-1 text-xs rounded-2xl">
              Disponible
            </span>
          </div>
          <div className="bg-black/5 backdrop-blur-md flex items-center justify-between px-3 py-2 rounded-br-xl rounded-bl-xl">
            <span className="text-sm text-secondary">
              250 dh
              <span className="text-xs text-text-secondary">/Jour</span>
            </span>
            <button className="inline-flex px-6 py-1.5 bg-secondary text-ternary text-xs rounded-sm hover:bg-accent hover:text-secondary transition duration-300 ease-linear cursor-pointer">
              Reserver
            </button>
          </div>
        </div>
        <div className="relative bg-ternary-fade rounded-xl min-h-52 cursor-pointer  flex flex-col justify-between">
          <img
            src="../../src/assets/images/ferrari.webp"
            alt=""
            className="absolute w-4/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  hover:scale-110 transition duration-500 ease-linear"
          />
          <div className="flex items-center justify-between px-3 py-2">
            <img
              src="../../src/assets/images/ferrari-64px.png"
              alt=""
              className="w-8"
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-secondary">
                Ferrari laferrari 2021
              </span>
              <span className="text-xs text-text-secondary ltr">
                12996-
                <bdi>أ</bdi>-68
              </span>
            </div>
            <span className="inline-flex bg-violet-100 text-violet-600 px-4 py-1 text-xs rounded-2xl">
              Reservé
            </span>
          </div>
          <div className="bg-black/5 backdrop-blur-md flex items-center justify-between px-3 py-2 rounded-br-xl rounded-bl-xl">
            <span className="text-sm text-secondary">
              450 dh
              <span className="text-xs text-text-secondary">/Jour</span>
            </span>
            <button className="inline-flex px-6 py-1.5 bg-secondary text-ternary text-xs rounded-sm hover:bg-accent hover:text-secondary transition duration-300 ease-linear cursor-pointer">
              Reserver
            </button>
          </div>
        </div>
        <div className="relative bg-ternary-fade rounded-xl min-h-52 cursor-pointer  flex flex-col justify-between">
          <img
            src="../../src/assets/images/mercedes.webp"
            alt=""
            className="absolute w-4/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  hover:scale-110 transition duration-500 ease-linear"
          />
          <div className="flex items-center justify-between px-3 py-2">
            <img
              src="../../src/assets/images/mercedes-benz-64px.png"
              alt=""
              className="w-8"
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-secondary">
                Mercedes 2023
              </span>
              <span className="text-xs text-text-secondary ltr">
                92496-
                <bdi>أ</bdi>-68
              </span>
            </div>
            <span className="inline-flex bg-orange-100 text-orange-600 px-4 py-1 text-xs rounded-2xl">
              Maintenance
            </span>
          </div>
          <div className="bg-black/5 backdrop-blur-md flex items-center justify-between px-3 py-2 rounded-br-xl rounded-bl-xl">
            <span className="text-sm text-secondary">
              350 dh
              <span className="text-xs text-text-secondary">/Jour</span>
            </span>
            <button className="inline-flex px-6 py-1.5 bg-secondary text-ternary text-xs rounded-sm hover:bg-accent hover:text-secondary transition duration-300 ease-linear cursor-pointer">
              Reserver
            </button>
          </div>
        </div>
      </div>
      {showAddCar && <AddNewCar onClick={handleClick} />}
    </div>
  );
}

export default Cars;
