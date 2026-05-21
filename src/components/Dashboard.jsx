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
        <div className="py-2 px-4 bg-mauve-100 rounded-md min-w-1/4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">TOTAL CARS</span>
            <CarIcon
              className="bg-mauve-200 p-1.5 rounded-full"
              size={34}
              strokeWidth={1.5}
            />
          </div>
          <div>
            <span className="text-4xl font-medium">
              {cars ? cars.length : null}
            </span>
          </div>
        </div>
        <div className="py-2 px-4 bg-orange-50 rounded-md w-1/4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">AVAILABLE CARS</span>
            <Check
              className="bg-orange-100 p-1.5 rounded-full"
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
        <div className="py-2 px-4 bg-violet-50 rounded-md w-1/4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">TOTAL BOOKINGS</span>
            <Pen
              className="bg-violet-100 p-1.5 rounded-full"
              size={34}
              strokeWidth={1.5}
            />
          </div>
        </div>
        <div className="py-2 px-4 bg-emerald-50 rounded-md w-1/4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">REVENUE</span>
            <DollarSign
              className="bg-emerald-100 p-1.5 rounded-full"
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
