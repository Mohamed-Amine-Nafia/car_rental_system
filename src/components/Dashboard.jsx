import { CarIcon, Check, DollarSign, Pen } from "lucide-react";
import { useEffect, useState } from "react";

function Dashboard() {
  const [cars, setCars] = useState(null);

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
    <div className="relative w-full h-screen bg-primary p-6 ">
      <h2 className="text-2xl text-secondary font-semibold mt-6  border-b border-ternary pb-2.5">
        TABLEAU DE BORD
      </h2>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="py-2 px-4 bg-emerald-100 rounded-md min-w-1/4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-600">
              TOTAL CARS
            </span>
            <CarIcon
              className="bg-emerald-200 text-emerald-600 p-1.5 rounded-full"
              size={34}
              strokeWidth={1.5}
            />
          </div>
          <div>
            <span className="text-4xl font-medium text-secondary">
              {cars ? cars.length : null}
            </span>
          </div>
        </div>
        <div className="py-2 px-4 bg-orange-100 rounded-md w-1/4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-orange-600">
              AVAILABLE CARS
            </span>
            <Check
              className="bg-orange-200 text-orange-600 p-1.5 rounded-full"
              size={34}
              strokeWidth={1.5}
            />
          </div>
          <div>
            <span className="text-4xl font-medium">
              {cars
                ? cars.filter((car) => car.status === "disponible").length
                : null}
            </span>
          </div>
        </div>
        <div className="py-2 px-4 bg-violet-100 rounded-md w-1/4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-violet-600">
              TOTAL BOOKINGS
            </span>
            <Pen
              className="bg-violet-200 text-violet-600 p-1.5 rounded-full"
              size={34}
              strokeWidth={1.5}
            />
          </div>
        </div>
        <div className="py-2 px-4 bg-sky-100 rounded-md w-1/4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-sky-600">REVENUE</span>
            <DollarSign
              className="bg-sky-200 text-sky-600 p-1.5 rounded-full"
              size={34}
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
