import { Check, Cog, Fuel, X } from "lucide-react";
import { useEffect, useState } from "react";

function Cars({ isDarkMode }) {
  const [cars, setCars] = useState([]);
  const [reservedCar, setReservedCar] = useState(null);
  const [isFormShown, setIsFormShown] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [rentalInfos, setRentalInfos] = useState({
    startDate: "",
    endDate: "",
    fullName: "",
    phone: "",
    license: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          "http://localhost/car_rental/fetch-cars.php",
        );
        const data = await response.json();

        if (data.status !== "success") {
          console.log(data.message);
        }

        if (data.data.length > 0) {
          setCars(data.data);
          localStorage.setItem("cars", JSON.stringify(data.data));
        }
      } catch (error) {
        const cached = JSON.parse(localStorage.getItem("cars"));
        if (cached) {
          setCars(cached);
        } else {
          setCars([]);
        }
      }
    };
    fetchCars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    const payload = {
      car_id: reservedCar.car_id,
      start_date: rentalInfos.startDate,
      end_date: rentalInfos.endDate,
      full_name: rentalInfos.fullName,
      phone: rentalInfos.phone,
      license: rentalInfos.license,
    };

    try {
      const response = await fetch("http://localhost/car_rental/rentals.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text);
      }

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "Erreur serveur");
        return;
      }

      setSuccessMessage(data.message);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const availableCars = cars.filter((car) => car.status === "disponible");

  const handleClick = (item) => {
    const clientChoice = cars.find((car) => car.car_id === item.car_id);
    setReservedCar(clientChoice);
    setIsFormShown(true);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRentalInfos((prev) => ({ ...prev, [name]: value }));
  };

  function calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end - start;

    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays;
  }

  const rentalDays = calculateDays(rentalInfos.startDate, rentalInfos.endDate);

  return (
    <div id="cars-section" className="p-5 mt-4 md:mt-10 lg:mt-16 relative">
      <div className="flex gap-1.5 items-center">
        <h2
          className={`text-xl md:text-2xl font-medium border-b-2  whitespace-nowrap ${isDarkMode ? "text-ternary border-ternary" : "text-secondary border-secondary"}`}
        >
          NOTRE FLOTTE
        </h2>
        <span
          className={`text-xs md:text-sm whitespace-nowrap ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
        >
          (Les voitures disponibles)
        </span>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
        {availableCars.map((car) => {
          return (
            <div
              className={`relative flex flex-col justify-between h-70 border-2  rounded-xl cursor-pointer ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-ternary-fade border-ternary "}`}
              key={car.car_id}
            >
              <img
                className="absolute w-5/6 md:w-4/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 duration-300 ease-linear"
                src={`http://localhost/car_rental/uploads/cars/${car.image}`}
                alt="car"
              />
              <div className="p-3 flex items-center gap-4">
                <img
                  className="w-8 h-8 md:w-10 md:h-10 "
                  src={`../src/assets/images/cars_icons/${car.brand}.png`}
                  alt="car"
                />
                <div>
                  <span
                    className={`text-lg font-medium ${isDarkMode ? "text-primary" : "text-secondary"} capitalize`}
                  >
                    {car.brand}
                  </span>
                  <span
                    className={`ml-1  ${isDarkMode ? "text-ternary" : "text-text-secondary"}`}
                  >
                    {car.model}
                  </span>
                  <br />
                  <span
                    className={` ${isDarkMode ? "text-ternary" : "text-text-secondary"}`}
                  >
                    {car.plate}
                  </span>
                </div>
              </div>
              <div className="bg-black/5 p-3 backdrop-blur-2xl rounded-br-xl rounded-bl-xl relative">
                <div>
                  <span
                    className={`text-lg ${isDarkMode ? "text-primary" : "text-secondary"}`}
                  >
                    {car.price} MAD
                  </span>
                  <span
                    className={` ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
                  >
                    /Jour
                  </span>
                </div>
                <div className="flex  flex-col text-xs">
                  <span
                    className={`inline-flex items-center gap-1 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
                  >
                    <Cog size={17} />
                    {car.transmission}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
                  >
                    <Fuel size={17} />
                    {car.fuel}
                  </span>
                </div>
                <button
                  onClick={() => handleClick(car)}
                  className={`absolute top-1/2 -translate-y-1/2 right-3   py-1.5 px-4 rounded-full text-sm  hover:bg-accent hover:text-secondary duration-200 ease-linear cursor-pointer ${isDarkMode ? "bg-ternary text-secondary" : "bg-secondary text-ternary"}`}
                >
                  Résérver
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/**THE RESERVATION FORM */}
      {reservedCar && isFormShown && (
        <div
          className={`absolute w-11/12 md:max-w-11/12 lg:max-w-3/4 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col md:flex-row  rounded-lg p-3 ${isDarkMode ? "bg-gray-900 text-ternary" : "bg-ternary text-secondary"}`}
        >
          <span
            onClick={() => {
              setIsFormShown(false);
            }}
            className={`absolute top-3 right-3 bg-red-400 rounded-full p-1 cursor-pointer hover:bg-red-600 duration-200 ease-linear ${isDarkMode ? "text-secondary" : "text-ternary"}`}
          >
            <X size={18} />
          </span>
          <div
            className={`p-5 w-full  rounded-md ${isDarkMode ? "bg-slate-800 text-ternary" : "bg-primary text-secondary"}`}
          >
            <div className="h-1/2">
              <img
                className="w-4/5  mx-auto"
                src={`http://localhost/car_rental/uploads/cars/${reservedCar.image}`}
                alt="car"
              />
              <h3
                className={`text-lg md:text-2xl font-normal  mt-3 ${isDarkMode ? "text-ternary" : "text-secondary"}`}
              >
                {reservedCar.brand}{" "}
                <span className="text-sm md:text-lg">{reservedCar.model}</span>{" "}
                <span
                  className={`text-xs md:text-sm ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
                >
                  {reservedCar.year}
                </span>{" "}
              </h3>
              <div
                className={`flex items-center gap-2.5 text-xs  md:text-sm text-text-secondary  font-light ${isDarkMode ? "text-text-ternary " : "text-text-secondary"}`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Cog size={16} />
                  {reservedCar.transmission}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Fuel size={16} /> {reservedCar.fuel}
                </span>
              </div>
            </div>

            <div className=" flex flex-col  h-1/2 justify-end pb-3">
              <span
                className={`mt-2.5  border-t-2 pt-3 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
              >
                {rentalDays || 0} jours x {reservedCar.price} MAD
              </span>
              <span className="text-3xl mt-2">
                Total : {rentalDays * reservedCar.price || 0} MAD
              </span>
            </div>
          </div>
          <div className="p-5 ">
            <div>
              <h3 className="text-2xl">Résérver ce véhicule</h3>
              <p className="text-xs mt-2 leading-5">
                Remplissez le formulaire - l'agence vous confirmera votre
                réservation
              </p>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="mt-8 text-sm">
              <label htmlFor="start-date">PRISE EN CHARGE</label>

              <input
                onChange={handleChange}
                className={`w-full   text-accent py-2 px-2.5 rounded-md my-2.5 [&::-webkit-calendar-picker-indicator]:invert ${isDarkMode ? "bg-gray-800" : "bg-secondary"}`}
                type="date"
                name="startDate"
                id="start-date"
                required
              />
              <label htmlFor="end-date">RESTITUTION</label>
              <input
                onChange={handleChange}
                className={`w-full   text-accent py-2 px-2.5 rounded-md my-2.5 [&::-webkit-calendar-picker-indicator]:invert ${isDarkMode ? "bg-gray-800" : "bg-secondary"}`}
                type="date"
                name="endDate"
                id="end-date"
                required
              />
              <br />
              <label htmlFor="client-name">Nom complet</label>
              <input
                onChange={handleChange}
                className={`w-full  py-2 px-2.5 my-2.5 rounded-md ${isDarkMode ? "bg-gray-800 text-ternary" : "bg-primary text-secondary"}`}
                type="text"
                name="fullName"
                id="client-name"
                placeholder="ex : Amine Nafia"
                required
              />
              <label htmlFor="phone">Téléphone</label>
              <input
                onChange={handleChange}
                className={`w-full  py-2 px-2.5 my-2.5 rounded-md ${isDarkMode ? "bg-gray-800 text-ternary" : "bg-primary text-secondary"}`}
                type="tel"
                name="phone"
                id="phone"
                placeholder="ex : 0616454489"
                required
              />
              <label htmlFor="license">N° permis de conduire </label>
              <input
                onChange={handleChange}
                className={`w-full  py-2 px-2.5 my-2.5 rounded-md ${isDarkMode ? "bg-gray-800 text-ternary" : "bg-primary text-secondary"}`}
                type="text"
                name="license"
                id="license"
                placeholder="ex : AB123456"
              />
              <input
                className={`w-full  py-2 px-2.5 my-2.5 rounded-md hover:bg-accent hover:text-secondary duration-300 ease-linear cursor-pointer ${isDarkMode ? "bg-primary text-secondary" : "bg-secondary text-ternary"}`}
                type="submit"
                value="Confirmer la résérvation"
              />
            </form>
            <p
              className={`text-sm  mt-2.5 ${isDarkMode ? "text-text-ternary " : "text-text-secondary"}`}
            >
              En envoyant, vous acceptez d'étre contacté par l'agence pour
              confirmer cette résérvation
            </p>
          </div>
          {(successMessage || errorMessage) && (
            <div
              className={`py-5 px-10 rounded-md flex flex-col gap-5 border-2 ${isDarkMode ? "bg-gray-800 text-ternary border-gray-700" : "bg-primary text-secondary border-gray-400"} absolute w-4/5 md:w-3/5 justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `}
            >
              {successMessage && (
                <Check
                  className="p-1 bg-green-100 text-green-600 rounded-full"
                  size={32}
                />
              )}
              {errorMessage && (
                <X
                  className="p-1 bg-red-100 text-red-600 rounded-full"
                  size={32}
                />
              )}
              {successMessage && (
                <p className="text-xs md:text-sm text-center">
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="text-xs md:text-sm text-center">{errorMessage}</p>
              )}
              <button
                onClick={() => {
                  setSuccessMessage("");
                  setErrorMessage("");
                  setIsFormShown(false);
                }}
                className={`${isDarkMode ? "bg-primary text-secondary" : "bg-secondary text-ternary"} py-1.5 px-5 rounded-full cursor-pointer hover:bg-accent hover:text-secondary duration-200 ease-linear`}
              >
                D'accord
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cars;
