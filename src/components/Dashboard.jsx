import {
  CarIcon,
  Check,
  CircleX,
  DollarSign,
  Folder,
  FolderOpen,
  Hourglass,
  Pen,
  Road,
  Undo2,
} from "lucide-react";
import { useEffect, useState } from "react";

function Dashboard() {
  const [cars, setCars] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [revenue, setRevenue] = useState(null);

  const [dashboardStats, setDashboardStats] = useState(null);

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
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await fetch(
          "http://localhost/car_rental/fetch-rentals.php",
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error(`rentals failed to fetch ${response.status}`);
        }
        const data = await response.json();

        if (!data.status === "error") {
          throw new Error(`${data.message}`);
        }
        setBookings(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRentals();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "http://localhost/car_rental/dashboard-kpis.php",
        );

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error: ${errorText}`);
        }
        const data = await res.json();
        if (data.data.length === 0) {
          throw new Error("NO data was fetched!");
        }
        setDashboardStats(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="relative w-full h-screen bg-primary p-6 ">
      <h2 className="text-2xl text-secondary font-semibold mt-6  border-b border-ternary pb-2.5">
        TABLEAU DE BORD
      </h2>
      <div className="mt-6 grid grid-cols-6 gap-3 text-[10px]">
        <div className="py-2 px-3 bg-white rounded-md border border-ternary">
          <div className="flex flex-col">
            <Folder
              className=" text-accent"
              size={52}
              strokeWidth={1.5}
              fill="#ff0054"
            />
            <span className=" font-medium text-secondary uppercase">
              Voitures disponibles
            </span>
          </div>
          <div>
            <span className="text-3xl font-medium">
              {cars
                ? cars.filter((car) => car.status === "disponible").length
                : null}
            </span>
          </div>
        </div>
        <div className="py-2 px-3 bg-white rounded-md border border-ternary">
          <div className="flex flex-col">
            <Folder
              className=" text-accent"
              size={52}
              strokeWidth={1.5}
              fill="#ff0054"
            />
            <span className=" font-medium text-secondary uppercase">
              total de résérvations
            </span>
          </div>
          <div>
            <span className="text-3xl font-medium">{bookings?.length}</span>
          </div>
        </div>
        <div className="py-2 px-3 bg-white rounded-md border border-ternary">
          <div className="flex flex-col">
            <Folder
              className=" text-accent"
              size={52}
              strokeWidth={1.5}
              fill="#ff0054"
            />
            <span className=" font-medium text-secondary uppercase">
              résérvations en attente
            </span>
          </div>
          <div>
            <span className="text-3xl font-medium">
              {bookings &&
                bookings.filter((book) => book.status === "PENDING").length}
            </span>
          </div>
        </div>
        <div className="py-2 px-3 bg-white rounded-md border border-ternary">
          <div className="flex flex-col">
            <Folder
              className=" text-accent"
              size={52}
              strokeWidth={1.5}
              fill="#ff0054"
            />
            <span className=" font-medium text-secondary uppercase">
              locations en cours
            </span>
          </div>
          <div>
            <span className="text-3xl font-medium">
              {dashboardStats?.active_rentals}
            </span>
          </div>
        </div>
        <div className="py-2 px-3 bg-white rounded-md border border-ternary">
          <div className="flex flex-col">
            <Folder
              className=" text-accent"
              size={52}
              strokeWidth={1.5}
              fill="#ff0054"
            />
            <span className=" font-medium text-secondary uppercase">
              Voitures à retourner
            </span>
          </div>
          <div>
            <span className="text-3xl font-medium">
              {dashboardStats?.returning_today}
            </span>
          </div>
        </div>
        <div className="py-2 px-3 bg-white rounded-md border border-ternary">
          <div className="flex flex-col">
            <Folder
              className=" text-accent"
              size={52}
              strokeWidth={1.5}
              fill="#ff0054"
            />
            <span className=" font-medium text-secondary uppercase">
              locations en retard
            </span>
          </div>
          <div>
            <span className="text-3xl font-medium">
              {dashboardStats?.overdue_rentals}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
