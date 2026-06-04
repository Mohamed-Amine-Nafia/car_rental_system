import { Cog, Fuel, X } from "lucide-react";
import { useEffect, useState } from "react";

function Cars() {
  const [cars, setCars] = useState([]);
  const [reservedCar, setReservedCar] = useState(null);
  const [isFormShown, setIsFormShown] = useState(false);

  const [rentalPeriod, setRentalPeriod] = useState({
    startDate: "",
    endDate: "",
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

  const availableCars = cars.filter((car) => car.status === "disponible");

  const handleClick = (item) => {
    const clientChoice = cars.find((car) => car.car_id === item.car_id);
    setReservedCar(clientChoice);
    setIsFormShown(true);
  };

  const handleDateChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRentalPeriod((prev) => ({ ...prev, [name]: value }));
  };

  function calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end - start;

    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays;
  }

  const rentalDays = calculateDays(
    rentalPeriod.startDate,
    rentalPeriod.endDate,
  );

  return (
    <div id="cars-section" className="p-5 mt-4 md:mt-10 lg:mt-16 relative">
      <div className="flex gap-1.5 items-center">
        <h2 className="text-xl md:text-2xl font-medium border-b-2 border-secondary whitespace-nowrap">
          NOTRE FLOTTE
        </h2>
        <span className="text-xs md:text-sm text-text-secondary whitespace-nowrap">
          (Les voitures disponibles)
        </span>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {availableCars.map((car) => {
          return (
            <div
              className="relative flex flex-col justify-between h-72 bg-ternary-fade rounded-xl cursor-pointer"
              key={car.car_id}
            >
              <img
                className="absolute w-5/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 duration-300 ease-linear"
                src={`http://localhost/car_rental/uploads/cars/${car.image}`}
                alt="car"
              />
              <div className="p-3 flex gap-4">
                <img
                  className="w-12 aspect-square"
                  src={`../src/assets/images/cars_icons/${car.brand}.png`}
                  alt="car"
                />
                <div>
                  <span className="text-lg font-medium">{car.brand}</span>
                  <span className="ml-1 text-text-secondary">{car.model}</span>
                  <br />
                  <span className="text-text-secondary">{car.plate}</span>
                </div>
              </div>
              <div className="bg-black/5 p-3 backdrop-blur-2xl rounded-br-xl rounded-bl-xl relative">
                <div>
                  <span className="text-secondary text-lg">
                    {car.price} MAD
                  </span>
                  <span className="text-text-secondary">/Jour</span>
                </div>
                <div className="flex gap-2 text-xs md:text-sm">
                  <span className="inline-flex items-center gap-1 text-text-secondary">
                    <Cog size={17} />
                    {car.transmission}
                  </span>
                  <span className="inline-flex items-center gap-1 text-text-secondary">
                    <Fuel size={17} />
                    {car.fuel}
                  </span>
                </div>
                <button
                  onClick={() => handleClick(car)}
                  className="absolute top-1/2 -translate-y-1/2 right-3 bg-secondary text-ternary py-1.5 px-4 rounded-full text-sm  hover:bg-accent hover:text-secondary duration-200 ease-linear cursor-pointer"
                >
                  Reserver
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/**THE RESERVATION FORM */}
      {reservedCar && isFormShown && (
        <div
          className={`absolute w-11/12 md:max-w-11/12 lg:max-w-3/4 bg-ternary top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col md:flex-row  rounded-lg p-3`}
        >
          <span
            onClick={() => {
              setIsFormShown(false);
              setRentalPeriod({
                startDate: "",
                endDate: "",
              });
            }}
            className="absolute top-3 right-3 bg-red-400 rounded-full p-1 cursor-pointer hover:bg-red-600 duration-200 ease-linear"
          >
            <X size={18} />
          </span>
          <div className=" p-5 w-full bg-primary rounded-md">
            <div className="h-1/2">
              <img
                className="w-4/5 mx-auto"
                src={`http://localhost/car_rental/uploads/cars/${reservedCar.image}`}
                alt="car"
              />
              <h3 className="text-lg md:text-2xl font-normal text-secondary mt-3">
                {reservedCar.brand}{" "}
                <span className="text-secondary text-sm md:text-xl">
                  {reservedCar.model}
                </span>{" "}
                <span className="text-text-secondary text-xs md:text-lg">
                  {reservedCar.year}
                </span>{" "}
              </h3>
              <div className="flex items-center gap-2.5 text-sm  md:text-lg text-text-secondary  font-light">
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
              <span className="mt-2.5 text-text-secondary  border-t-2 pt-3">
                {rentalDays || 0} jours x {reservedCar.price} MAD
              </span>
              <span className="text-2xl mt-2">
                Total : {rentalDays * reservedCar.price || 0} MAD
              </span>
            </div>
          </div>
          <div className="p-5 text-secondary">
            <div>
              <h3 className="text-2xl">Résérver ce véhciule</h3>
              <p className="text-xs mt-2 leading-5">
                Remplissez le formulaire - l'agence vous confirmera votre
                réservation
              </p>
            </div>
            <form className="mt-8 text-sm">
              <label htmlFor="start-date">PRISE EN CHARGE</label>

              <input
                onChange={handleDateChange}
                className="w-full bg-secondary  py-2 px-2.5 rounded-md my-2.5 text-accent [&::-webkit-calendar-picker-indicator]:invert "
                type="date"
                name="startDate"
                id="start-date"
                required
              />
              <label htmlFor="end-date">RESTITUTION</label>
              <input
                onChange={handleDateChange}
                className="w-full  bg-secondary text-accent py-2 px-2.5 rounded-md my-2.5 [&::-webkit-calendar-picker-indicator]:invert"
                type="date"
                name="endDate"
                id="end-date"
                required
              />
              <br />
              <label htmlFor="client-name">Nom complet</label>
              <input
                className="w-full bg-primary py-2 px-2.5 rounded-md my-2.5"
                type="text"
                name="clien-name"
                id="client-name"
                placeholder="ex : Amine Nafia"
                required
              />
              <label htmlFor="phone">Téléphone</label>
              <input
                className="w-full bg-primary py-2 px-2.5 my-2.5 rounded-md"
                type="tel"
                name="phone"
                id="phone"
                placeholder="ex : 0616454489"
                required
              />
              <label htmlFor="license">
                N° permis de conduire{" "}
                <span className="text-text-secondary">(optionnel)</span>{" "}
              </label>
              <input
                className="w-full bg-primary py-2 px-2.5 my-2.5 rounded-md"
                type="text"
                name="license"
                id="license"
                placeholder="ex : AB123456"
              />
              <input
                className="w-full bg-secondary text-ternary py-2 px-2.5 my-2.5 rounded-md hover:bg-accent hover:text-secondary duration-300 ease-linear cursor-pointer"
                type="submit"
                value="Confirmer la résérvation"
              />
            </form>
            <p className="text-sm text-text-secondary mt-2.5">
              En envoyant, vous acceptez d'étre contacté par l'agence pour
              confirmer cette résérvation
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cars;
