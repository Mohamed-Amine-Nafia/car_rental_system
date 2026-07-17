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

function Dashboard({ language, translations }) {
  const [cars, setCars] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [clients, setClients] = useState([]);
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

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          "http://localhost/car_rental/fetch-clients.php",
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }

        const data = await response.json();
        if (data.status === "error") {
          throw new Error(data.message);
        }

        setClients(data.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClients();
  }, []);

  const bookingRevenuePoints = (bookings || [])
    .slice(0, 6)
    .map((booking, index) => {
      const numericRevenue = Number(
        booking?.revenue ??
          booking?.amount ??
          booking?.total_amount ??
          booking?.price ??
          booking?.total_price ??
          booking?.cost ??
          booking?.daily_rate ??
          booking?.price_per_day ??
          0,
      );

      return Number.isFinite(numericRevenue) && numericRevenue > 0
        ? numericRevenue
        : index + 1;
    });

  const totalRevenue = (bookings || []).reduce((sum, booking) => {
    const numericRevenue = Number(
      booking?.revenue ??
        booking?.amount ??
        booking?.total_amount ??
        booking?.price ??
        booking?.total_price ??
        booking?.cost ??
        booking?.daily_rate ??
        booking?.price_per_day ??
        0,
    );

    return (
      sum +
      (Number.isFinite(numericRevenue) && numericRevenue > 0
        ? numericRevenue
        : 0)
    );
  }, 0);

  const maxRevenuePoint = Math.max(...bookingRevenuePoints, 1);
  const revenueChangePercent = 12;
  const getClientName = (clientId) => {
    const matchedClient = clients.find(
      (client) => client.client_id === clientId,
    );
    return matchedClient?.full_name || "Client";
  };
  const revenueChangeIsPositive = revenueChangePercent >= 0;
  const chartColors = [
    "#f81f4a",
    "#1f6feb",
    "#16a34a",
    "#f59e0b",
    "#8b5cf6",
    "#0f766e",
  ];

  return (
    <div className="relative w-full h-screen bg-primary p-6 ">
      <h2 className="text-2xl text-secondary font-semibold mt-6  border-b border-ternary pb-2.5">
        {language === "ar" ? "لوحة التحكم" : "DASHBOARD"}
      </h2>
      <div className="mt-6 grid grid-cols-6 gap-3 text-[14px]">
        <div className="py-2 px-3 bg-white rounded-md border border-ternary">
          <div className="flex flex-col">
            <Folder
              className=" text-accent"
              size={52}
              strokeWidth={1.5}
              fill="#f81f4a"
            />
            <span className=" font-medium text-secondary uppercase">
              {translations?.availableCars || "Available cars"}
            </span>
          </div>
          <div>
            <span className="text-3xl font-medium">
              {cars
                ? cars.filter((car) => car.status === "available").length
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
              fill="#f81f4a"
            />
            <span className=" font-medium text-secondary uppercase">
              {translations?.totalBookings || "Total bookings"}
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
              fill="#f81f4a"
            />
            <span className=" font-medium text-secondary uppercase">
              {translations?.pendingBookings || "Pending bookings"}
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
              fill="#f81f4a"
            />
            <span className=" font-medium text-secondary uppercase">
              {translations?.activeRentals || "Active rentals"}
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
              fill="#f81f4a"
            />
            <span className=" font-medium text-secondary uppercase">
              {translations?.carsToReturn || "Cars to return"}
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
              fill="#f81f4a"
            />
            <span className=" font-medium text-secondary uppercase">
              {translations?.overdueRentals || "Overdue rentals"}
            </span>
          </div>
          <div>
            <span className="text-3xl font-medium">
              {dashboardStats?.overdue_rentals}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl border border-ternary bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary">
              {language === "ar" ? "الحجوزات الأخيرة" : "Recent bookings"}
            </h3>
            <span className="text-[11px] text-text-secondary">
              {language === "ar" ? "آخر 5" : "Last 5"}
            </span>
          </div>

          <div className="space-y-2 h-56 overflow-y-scroll scrollbar-thin">
            {(bookings || []).slice(0, 5).map((booking, index) => (
              <div
                key={booking.id || index}
                className="flex items-center justify-between rounded-lg border border-ternary bg-primary px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-secondary">
                    {booking.client_name ||
                      getClientName(booking.client_id) ||
                      "Client"}
                  </p>
                  <p className="text-[11px] text-text-secondary">
                    {booking.start_date || "--"} → {booking.end_date || "--"}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${booking.status === "PENDING" ? "bg-orange-100 text-orange-700" : booking.status === "CONFIRMED" ? "bg-emerald-100 text-emerald-700" : "bg-violet-100 text-violet-700"}`}
                >
                  {booking.status || ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-ternary bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-secondary">
              {language === "ar" ? "الإيرادات" : "Revenue"}
            </h3>
            <span className="text-[11px] text-text-secondary">
              {language === "ar" ? "هذا الشهر" : "This month"}
            </span>
          </div>

          <div className="rounded-lg border border-ternary bg-primary p-3">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] uppercase text-text-secondary">
                  {language === "ar" ? "إجمالي الإيرادات" : "Total revenue"}
                </p>
                <p className="mt-1 text-2xl font-semibold text-secondary">
                  {totalRevenue || dashboardStats?.revenue || 0} DH
                </p>
              </div>
              <div
                className={`text-[11px] font-medium ${revenueChangeIsPositive ? "text-emerald-600" : "text-red-600"}`}
              >
                {revenueChangeIsPositive ? "+" : ""}
                {revenueChangePercent}%
              </div>
            </div>

            <div className="mt-4 flex h-24 items-end gap-2">
              {bookingRevenuePoints.map((value, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-md"
                  style={{
                    height: `${Math.max(12, (value / maxRevenuePoint) * 100)}%`,
                    backgroundColor: chartColors[index % chartColors.length],
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
