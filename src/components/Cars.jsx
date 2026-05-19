import { Search } from "lucide-react";
import AddNewCar from "./AddNewCar";
import { useEffect, useState } from "react";

function Cars() {
  const [showAddCar, setShowAddCar] = useState(false);
  const [cars, setCars] = useState([]);

  function handleClick(value) {
    setShowAddCar(value);
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost/car_rental/fetch-cars.php");
        const data = await res.json();

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        if (data.data !== []) {
          setCars(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="relative h-full w-full bg-primary rounded-md  p-8">
      <h2 className="text-3xl font-semibold mt-6">Cars Collection</h2>
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
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 text-sm mt-12 gap-3">
        {cars.map((car) => {
          return (
            <div
              key={car.id}
              className="relative bg-ternary-fade rounded-xl min-h-52 cursor-pointer  flex flex-col justify-between"
            >
              <img
                src={`http://localhost/car_rental/uploads/cars/${car.image}`}
                alt=""
                className="absolute w-4/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  hover:scale-110 transition duration-500 ease-linear"
              />
              <div className="flex items-center gap-2.5 px-3 py-2">
                <img
                  src={`../../src/assets/images/car-logo/${car.brand}.png`}
                  alt="car"
                  className="w-9"
                />
                <div className="flex flex-col whitespace-nowrap">
                  <span className="text-xs font-semibold capitalize text-secondary">
                    {car.brand} {car.model} {car.year}
                  </span>
                  <span className="text-xs text-text-secondary">
                    <bdi>{car.plate}</bdi>
                  </span>
                </div>
                <span
                  className={`inline-flex capitalize mx-auto  px-3 py-1 text-xs rounded-2xl ${car.status === "disponible" && "bg-emerald-100 text-emerald-600"} ${car.status === "reserve" && "bg-violet-100 text-violet-600"} ${car.status === "repair" && "bg-orange-100 text-orange-600"}`}
                >
                  {car.status}
                </span>
              </div>
              <div className="bg-black/5 backdrop-blur-md flex items-center justify-between px-3 py-2 rounded-br-xl rounded-bl-xl">
                <span className="text-sm text-secondary">
                  {car.price}dh
                  <span className="text-xs text-text-secondary">/Jour</span>
                </span>
                <button className="inline-flex px-6 py-1.5 bg-secondary text-ternary text-xs rounded-sm hover:bg-accent hover:text-secondary transition duration-300 ease-linear cursor-pointer">
                  Reserver
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {showAddCar && <AddNewCar onClick={handleClick} />}
    </div>
  );
}

export default Cars;
