import { Cog, Fuel } from "lucide-react";
import { useEffect, useState } from "react";

function Cars() {
  const [cars, setCars] = useState([]);

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
        }
      } catch (error) {
        throw new Error();
      }
    };
    fetchCars();
  }, []);

  const availableCars = cars.filter((car) => car.status === "disponible");

  return (
    <div id="cars-section" className="p-5 mt-4 md:mt-10 lg:mt-16">
      <div className="flex gap-1.5 items-center">
        <h2 className="text-xl md:text-2xl font-medium border-b-2 border-secondary whitespace-nowrap">
          NOTRE FLOTTE
        </h2>
        <span className="text-xs md:text-sm text-text-secondary whitespace-nowrap">
          ( Les voitures disponibles )
        </span>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {availableCars.map((car) => {
          return (
            <div
              className="relative flex flex-col justify-between h-72 bg-ternary-fade rounded-xl"
              key={car.car_id}
            >
              <img
                className="absolute w-5/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 duration-300 ease-linear"
                src={`http://localhost/car_rental/uploads/cars/${car.image}`}
                alt=""
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
                  <span className="text-secondary text-lg">{car.price}dh</span>
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
                <button className="absolute top-1/2 -translate-y-1/2 right-3 bg-secondary text-ternary py-1.5 px-4 rounded-full text-sm md:text-lg hover:bg-accent hover:text-secondary duration-300 ease-linear cursor-pointer">
                  Reserver
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cars;
