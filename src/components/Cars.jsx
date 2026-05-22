import { Check, Cog, Fuel, Search } from "lucide-react";
import AddNewCar from "./AddNewCar";
import { useEffect, useRef, useState } from "react";
import { Await } from "react-router-dom";

const filters = ["All", "Disponible", "Reservé", "Repair"];

function Cars() {
  const [isActive, setIsActive] = useState(0);
  const [showAddCar, setShowAddCar] = useState(false);
  const [isCarRemoved, setIsCarRemoved] = useState(false);
  const [notification, setNotification] = useState("");
  const [searchedCar, setSearchCar] = useState("");
  const [cars, setCars] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  function handleClick(value) {
    setShowAddCar(value);
  }

  function handleChange(event) {
    setSearchCar(event.target.value);
  }

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost/car_rental/fetch-cars.php");
        const data = await res.json();

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        if (data.data.length > 0) {
          setCars(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCars();
  }, [handleClick]);

  const filterdCars = cars.filter((car) => {
    const matchedStatus =
      activeCategory === "all" ? cars : car.status === activeCategory;
    const matchedSearch = car.brand
      .toLowerCase()
      .includes(searchedCar.toLowerCase());
    return matchedSearch && matchedStatus;
  });

  const handleCarDelete = async (id) => {
    const res = await fetch("http://localhost/car_rental/delete-car.php", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log("Car is not removed");
    }
    setIsCarRemoved(true);
    setNotification(data.message);
    console.log(data.message);
  };

  return (
    <div className="relative w-full h-full bg-primary  px-6 pt-3">
      <h2 className="text-2xl text-secondary font-semibold mt-4  border-b border-ternary pb-2.5">
        FLOTTE
      </h2>
      <div className="flex items-center gap-6 w-full  mt-6  border-b border-ternary pb-6">
        <div className="relative">
          <input
            value={searchedCar}
            type="text"
            placeholder="Rechercher"
            className="bg-ternary rounded-full text-xs pl-3 pr-16 outline-0 border-0 py-2.5"
            onChange={handleChange}
          />
          <Search className="absolute right-3 top-2" size={18} />
        </div>
        <div className="flex items-center gap-3 text-xs">
          {filters.map((item, index) => {
            return (
              <span
                key={index}
                onClick={() => {
                  setIsActive(index);
                  setActiveCategory(item.toLowerCase());
                }}
                className={`inline-block  px-5 py-2.5 rounded-full hover:bg-accent hover:text-secondary transition duration-300 ease-linear cursor-pointer ${isActive === index ? "bg-accent text-secondary" : "bg-secondary text-ternary"}`}
              >
                {item}
              </span>
            );
          })}
        </div>
        <div className="flex flex-1 justify-end text-[13px]">
          <button
            onClick={() => setShowAddCar(true)}
            className="inline-flex items-center bg-accent text-secondary px-6 py-2.5 rounded-full font-medium cursor-pointer hover:bg-secondary hover:text-ternary transition duration-300 ease-linear"
          >
            Ajouter une voiture
          </button>
        </div>
      </div>
      {/* Cars Container */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-4 overflow-y-scroll scroll-smooth scrollbar-none w-full h-4/5   text-sm mt-6 ">
        {filterdCars.map((car) => {
          return (
            <div
              key={car.car_id}
              className="relative  bg-ternary-fade rounded-xl min-h-72 max-h-72 cursor-pointer  flex flex-col justify-between"
            >
              <img
                src={`http://localhost/car_rental/uploads/cars/${car.image}`}
                alt=""
                className="absolute w-4/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  hover:scale-110 transition duration-300 ease-linear"
              />
              <div className="flex items-center gap-3 px-5 py-3">
                <img
                  src={`../../src/assets/images/car-logo/${car.brand}.png`}
                  alt="car"
                  className="w-10"
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
                  className={`inline-flex capitalize ml-auto   px-4 py-2 text-xs rounded-2xl ${car.status === "disponible" && "bg-emerald-100 text-emerald-600"} ${car.status === "reservé" && "bg-violet-100 text-violet-600"} ${car.status === "repair" && "bg-orange-100 text-orange-600"}`}
                >
                  {car.status}
                </span>
              </div>
              <div className="bg-ternary backdrop-blur-md flex items-center   px-5 py-3 rounded-br-xl rounded-bl-xl">
                <div className="flex flex-col">
                  <span className="text-[16px] font-medium text-secondary  ">
                    {car.price}dh
                    <span className="text-xs">/Jour</span>
                  </span>
                  <div className="flex gap-1 text-text-secondary">
                    <Cog strokeWidth={2} size={16} />
                    <span className="text-xs">{car.transmission}</span>
                    <Fuel strokeWidth={2} size={16} />
                    <span className="text-xs">{car.fuel}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleCarDelete(car.car_id)}
                  className="inline-flex px-6 py-2.5 bg-secondary text-ternary text-xs rounded-full hover:bg-accent hover:text-secondary transition duration-300 ease-linear cursor-pointer ml-auto"
                >
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <AddNewCar showform={showAddCar} onClick={handleClick} />
      {/* CAR REMOVING NOTIFICATION */}
      {isCarRemoved && (
        <div
          className={`absolute flex flex-col gap-3.5 items-center rounded-md  transition duration-300 ease-linear  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-primary px-6 py-8 pb-4 ${isCarRemoved ? "scale-100" : "scale-0"} `}
        >
          <Check
            className="text-emerald-500 bg-emerald-100 p-1.5 rounded-full "
            size={38}
          />
          <p className="text-sm text-secondary">{notification}</p>
          <button
            onClick={() => setIsCarRemoved(false)}
            className="inline-flex text-xs w-fit mt-3 rounded-full  bg-secondary text-ternary py-2 px-5 hover:bg-accent hover:text-secondary transition duration-300 ease-linear cursor-pointer"
          >
            D'accord!
          </button>
        </div>
      )}
    </div>
  );
}

export default Cars;
