import {
  Check,
  Cog,
  Fuel,
  Plus,
  Recycle,
  Search,
  Trash2,
  Undo2,
} from "lucide-react";
import AddNewCar from "./AddNewCar";
import { useEffect, useState } from "react";
import { Await } from "react-router-dom";
import UpdateCar from "./UpdateCar";

import { API_URL } from "../config/api";

function Cars({ language, translations }) {
  const filters = [
    {
      key: "all",
      label: translations?.all || (language === "ar" ? "الكل" : "All"),
    },
    {
      key: "available",
      label:
        translations?.available || (language === "ar" ? "متاح" : "Available"),
    },
    {
      key: "reserved",
      label:
        translations?.reserved || (language === "ar" ? "محجوز" : "Reserved"),
    },
    {
      key: "repair",
      label: translations?.repair || (language === "ar" ? "إصلاح" : "Repair"),
    },
  ];
  const [isActive, setIsActive] = useState(0);
  const [showAddCar, setShowAddCar] = useState(false);
  const [showUpdateCar, setShowUpdateCar] = useState(false);
  const [carToUpdate, setCarToUpdate] = useState(null);
  const [isCarRemoved, setIsCarRemoved] = useState(false);
  const [notification, setNotification] = useState("");
  const [searchedCar, setSearchCar] = useState("");
  const [cars, setCars] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [confirMessage, setConfirmMessage] = useState(false);
  const [carId, setCarId] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

  function handleRefresh(value) {
    setIsRefresh(value);
  }

  function handleClick(value) {
    setShowAddCar(value);
  }
  function handleUpdate(value) {
    setShowUpdateCar(value);
  }

  function handleChange(event) {
    setSearchCar(event.target.value);
  }

  useEffect(() => {
    setIsRefresh(false);
    const fetchCars = async () => {
      try {
        const res = await fetch(`${API_URL}/fetch-cars.php`);
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
  }, [isRefresh]);

  function isStatusMatch(status, category) {
    const normalizedStatus = String(status).toLowerCase();
    const statusVariants = {
      available: ["available", "disponible", "متاح"],
      reserved: ["reserved", "محجوز"],
      repair: ["repair", "إصلاح"],
    };

    return category === "all"
      ? true
      : statusVariants[category]?.includes(normalizedStatus) || false;
  }

  const filterdCars = cars.filter((car) => {
    const matchedStatus = isStatusMatch(car.status, activeCategory);
    const matchedSearch = car.brand
      .toLowerCase()
      .includes(searchedCar.toLowerCase());
    return matchedSearch && matchedStatus;
  });

  const handleCarDelete = async (id) => {
    const res = await fetch(`${API_URL}/delete-car.php`, {
      method: "DELETE",
      credentials: "include",
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
  };

  function formatPlate(plate) {
    const [region, number, letter] = plate.split("-");
    return { number, letter, region };
  }

  return (
    <div className="relative w-full h-full bg-primary  px-6 pt-3">
      <h2 className="text-2xl text-secondary font-semibold mt-4  border-b border-ternary pb-2.5">
        {language === "ar" ? "الأسطول" : "FLEET"}
      </h2>
      <div className="flex items-center gap-6 w-full  mt-6  border-b border-ternary pb-6">
        <div className="relative">
          <input
            value={searchedCar}
            type="text"
            placeholder={translations?.search || "Search"}
            className="bg-ternary rounded-full text-xs pl-3 pr-16 outline-0 border-0 py-2"
            onChange={handleChange}
          />
          <Search className="absolute right-3 top-1.5" size={18} />
        </div>
        <div className="flex items-center gap-3 text-xs">
          {filters.map((item, index) => {
            return (
              <span
                key={item.key}
                onClick={() => {
                  setIsActive(index);
                  setActiveCategory(item.key);
                }}
                className={`inline-block  px-5 py-2 rounded-full hover:bg-accent hover:text-secondary transition duration-300 ease-linear cursor-pointer ${isActive === index ? "bg-accent text-ternary" : "bg-secondary text-ternary"}`}
              >
                {item.label}
              </span>
            );
          })}
        </div>
        <div className="flex flex-1 justify-end text-xs">
          <button
            onClick={() => setShowAddCar(true)}
            className="inline-flex items-center gap-2 bg-accent text-ternary px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-secondary hover:text-ternary transition duration-300 ease-linear"
          >
            {translations?.addCar || "Add a car"}
            <Plus size={20} />
          </button>
        </div>
      </div>
      {/* Cars Container */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4  gap-2 overflow-y-scroll scroll-smooth scrollbar-none w-full h-4/5   text-sm mt-6 ">
        {filterdCars.map((car) => {
          const plate = formatPlate(car.plate);
          return (
            <div
              key={car.car_id}
              className="relative  bg-ternary-fade rounded-xl h-54 cursor-pointer  flex flex-col justify-between"
            >
              <img
                src={`${API_URL}/uploads/cars/${car.image}`}
                alt=""
                className="absolute w-4/6 lg:w-3/6 top-3/7 left-1/2 -translate-x-1/2 -translate-y-1/2  hover:scale-110 transition duration-300 ease-linear"
              />
              <div className="flex items-center justify-between gap-2 p-2 ">
                <div className="flex items-center gap-1.5">
                  <img
                    src={`../../src/assets/images/car-logo/${car.brand}.png`}
                    alt="car"
                    className="w-7"
                  />
                  <div className="flex flex-col whitespace-nowrap">
                    <span className="text-xs font-medium capitalize text-secondary">
                      {car.brand} {car.model} {car.year}
                    </span>
                    <span className="text-xs text-text-secondary" dir="ltr">
                      {plate.number}-<span dir="rtl">{plate.letter}</span>-
                      {plate.region}
                    </span>
                  </div>
                </div>
                <span
                  className={`inline-flex capitalize    px-2 py-1.5 text-[10px] rounded-2xl ${car.status === "available" && "bg-emerald-100 text-emerald-600"} ${car.status === "reserved" && "bg-violet-100 text-violet-600"} ${car.status === "repair" && "bg-orange-100 text-orange-600"}`}
                >
                  {car.status}
                </span>
              </div>
              <div className="bg-ternary backdrop-blur-md flex items-center   p-2 rounded-br-xl rounded-bl-xl">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-secondary  ">
                      {car.price}dh
                      <span className="text-xs">/Jour</span>
                    </span>
                    <div className="flex gap-1 flex-col  text-[11px]  text-text-secondary">
                      <span className=" inline-flex items-center gap-1">
                        <Cog strokeWidth={2} size={15} />
                        {car.transmission}
                      </span>

                      <span className="inline-flex items-center gap-1">
                        <Fuel strokeWidth={2} size={15} />
                        {car.fuel}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <button
                      onClick={() => {
                        setCarId(car.car_id);
                        setConfirmMessage(true);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-secondary text-ternary text-[10px] rounded-full hover:bg-accent hover:text-secondary transition duration-300 ease-linear cursor-pointer "
                    >
                      {translations?.delete || "Delete"}
                    </button>
                    <button
                      onClick={() => {
                        setCarToUpdate(car);
                        setShowUpdateCar(true);
                      }}
                      className="inline-flex px-3 py-1.5 bg-secondary text-ternary text-[10px] rounded-full hover:bg-accent hover:text-secondary transition duration-300 ease-linear cursor-pointer whitespace-nowrap"
                    >
                      {translations?.update || "Update"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <AddNewCar
        showform={showAddCar}
        onClick={handleClick}
        onRefresh={handleRefresh}
        language={language}
        translations={translations}
      />

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
            {translations?.ok || "OK!"}
          </button>
        </div>
      )}
      {showUpdateCar && (
        <UpdateCar
          showUpdateForm={showUpdateCar}
          onUpdate={handleUpdate}
          car={carToUpdate}
          onRefresh={handleRefresh}
          language={language}
          translations={translations}
        />
      )}
      {confirMessage && (
        <div className="absolute border border-secondary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-primary py-8 px-8 rounded-md flex flex-col items-center gap-5">
          <p className="text-[12px]">
            {translations?.confirmDelete ||
              "Are you sure you want to delete this car?"}
          </p>
          <div className="flex items-center gap-5">
            <button
              className="bg-accent py-1.5 px-4 text-xs rounded-full hover:bg-secondary text-ternary duration-200 ease-linear cursor-pointer"
              onClick={() => setConfirmMessage(false)}
            >
              {translations?.cancel || "Cancel"}
            </button>
            <button
              className="bg-secondary py-1.5 px-4 text-xs rounded-full hover:bg-accent text-ternary duration-200 ease-linear cursor-pointer"
              onClick={() => {
                handleCarDelete(carId);
                setConfirmMessage(false);
                setIsRefresh(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cars;
