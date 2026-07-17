import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function Rentals({ language, translations }) {
  const [rentals, setRentals] = useState([]);
  const [clients, setClients] = useState([]);
  const [cars, setCars] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

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
        setRentals(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRentals();
    setIsRefresh(false);
  }, [isRefresh]);

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
          const errorText = response.text();
          throw new Error(`Error: ${errorText}`);
        }
        const data = await response.json();
        if (data.status === "error") {
          throw new Error(`Error : ${data.message}`);
        }
        setClients(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          "http://localhost/car_rental/fetch-cars.php",
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          const errorText = response.text();
          throw new Error(`Error: ${errorText}`);
        }
        const data = await response.json();
        if (data.status === "error") {
          throw new Error(`Error : ${data.message}`);
        }
        setCars(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCars();
  }, []);

  const getClientInfos = (id) => {
    const foundClient = clients.find((client) => client.client_id === id);

    if (!foundClient) {
      return null;
    }
    return {
      name: foundClient.full_name,
      phone: foundClient.phone,
      license: foundClient.license_number,
    };
  };
  const getCarInfos = (id) => {
    const foundCar = cars.find((car) => car.car_id === id);

    if (!foundCar) {
      return null;
    }
    return {
      brand: foundCar.brand,
      plate: foundCar.plate,
      model: foundCar.model,
    };
  };

  const handleStatusChange = async (id, newStatus) => {
    setRentals((prev) =>
      prev.map((rental) =>
        rental.id === id ? { ...rental, status: newStatus } : rental,
      ),
    );
    try {
      const response = await fetch(
        "http://localhost/car_rental/update-rentals.php",
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            status: newStatus,
          }),
        },
      );
      if (!response.ok) {
        const errorText = response.text();
        throw new Error(`Error: ${errorText}`);
      }
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  function plateFormat(plate) {
    if (!plate) {
      return {
        region: "",
        letter: "",
        number: "",
      };
    }

    const [number, region, letter] = plate.split("-");
    return { region, letter, number };
  }

  const getStatusLabel = (status) => {
    const statusMap = {
      PENDING:
        translations?.pendingStatus ||
        (language === "ar" ? "قيد الانتظار" : "Pending"),
      CANCELLED:
        translations?.cancelledStatus ||
        (language === "ar" ? "ملغاة" : "Cancelled"),
      CONFIRMED:
        translations?.confirmedStatus ||
        (language === "ar" ? "مؤكدة" : "Confirmed"),
      ACTIVE:
        translations?.activeStatus || (language === "ar" ? "نشطة" : "Active"),
      EXPIRED:
        translations?.expiredStatus ||
        (language === "ar" ? "منتهية" : "Expired"),
    };
    return statusMap[status] || status;
  };

  return (
    <div className="relative h-screen w-full bg-primary  p-6">
      <h2 className="text-2xl text-secondary font-semibold mt-6  border-b border-ternary pb-2.5">
        {translations?.reservationsTitle ||
          (language === "ar" ? "الحجوزات" : "RESERVATIONS")}
      </h2>
      <div className="mt-10">
        <div className={`grid grid-cols-11 text-xs w-full whitespace-nowrap`}>
          <span
            className={`text-left  bg-secondary text-ternary  py-2  px-5 border-l border-ternary rounded-tl-full rounded-bl-full`}
          >
            {translations?.no || "N°"}
          </span>
          <span
            className={`text-left bg-secondary text-ternary  py-2  px-5 border-l border-ternary`}
          >
            {translations?.clientLabel ||
              (language === "ar" ? "العميل" : "CLIENT")}
          </span>
          <span
            className={`text-left bg-secondary text-ternary  py-2  px-5 border-l border-ternary`}
          >
            {translations?.phoneLabel ||
              (language === "ar" ? "الهاتف" : "PHONE")}
          </span>
          <span
            className={`text-left bg-secondary text-ternary  py-2  px-5 border-l border-ternary`}
          >
            {translations?.licenseLabel ||
              (language === "ar" ? "رقم الرخصة" : "LICENSE NO.")}
          </span>
          <span
            className={`text-left bg-secondary text-ternary  py-2  px-5 border-l border-ternary`}
          >
            {translations?.vehicleLabel ||
              (language === "ar" ? "المركبة" : "VEHICLE")}
          </span>
          <span
            className={`text-left bg-secondary text-ternary  py-2  px-5 border-l border-ternary`}
          >
            {translations?.plateLabel ||
              (language === "ar" ? "اللوحة" : "PLATE")}
          </span>
          <span
            className={`text-left bg-secondary text-ternary  py-2  px-5 border-l border-ternary`}
          >
            {translations?.startLabel ||
              (language === "ar" ? "البداية" : "START")}
          </span>
          <span
            className={`text-left bg-secondary text-ternary  py-2  px-5 border-l border-ternary`}
          >
            {translations?.endLabel || (language === "ar" ? "النهاية" : "END")}
          </span>
          <span
            className={`text-left bg-secondary text-ternary  py-2  px-5 border-l border-ternary `}
          >
            {translations?.statusLabel ||
              (language === "ar" ? "الحالة" : "STATUS")}
          </span>
          <span
            className={`text-left bg-secondary text-ternary  py-2  px-5 border-l border-ternary `}
          >
            {translations?.operationsLabel ||
              (language === "ar" ? "العمليات" : "OPERATIONS")}
          </span>
          <span
            className={`text-left bg-secondary text-ternary  py-2  px-5 border-l border-ternary rounded-tr-full rounded-br-full`}
          >
            {translations?.pickupLabel ||
              (language === "ar" ? "الاستلام" : "PICKUP")}
          </span>
        </div>

        {rentals &&
          rentals.map((rental, index) => {
            const client = getClientInfos(rental.client_id);
            const car = getCarInfos(rental.car_id);
            const { region, letter, number } = plateFormat(car?.plate);
            return (
              <div
                key={rental.id}
                className="grid grid-cols-11  text-sm bg-primary w-full h-10 rounded-full border border-gray-100 whitespace-nowrap text-left hover:bg-accent cursor-pointer duration-200 ease-linear"
              >
                <span className={`text-left  text-secondary  py-2   px-5  `}>
                  {index + 1}
                </span>
                <span className={`text-left  text-secondary py-2   px-5 `}>
                  {client?.name}
                </span>
                <span className={`text-left  text-secondary  py-2   px-5 `}>
                  {client?.phone}
                </span>
                <span className={`text-left  text-secondary  py-2   px-5 `}>
                  {client?.license}
                </span>
                <span
                  className={`text-left  text-secondary  py-2   px-5 capitalize`}
                >
                  {car?.brand} {car?.model}
                </span>
                <span
                  dir="ltr"
                  className={`text-left  text-secondary  py-2   px-5 `}
                >
                  {region}-<span dir="rtl">{letter}</span>-{number}
                </span>
                <span className={`text-left  text-secondary py-2   px-5 `}>
                  {rental.start_date}
                </span>
                <span className={`text-left  text-secondary  py-2   px-5 `}>
                  {rental.end_date}
                </span>
                <span
                  className={`text-left   py-2 rounded-full h-fit   px-5 ${rental.status === "PENDING" && " text-orange-600"} ${rental.status === "CANCELLED" && " text-red-600"} ${rental.status === "CONFIRMED" && " text-emerald-600"} ${rental.status === "ACTIVE" && " text-violet-600"} ${rental.status === "EXPIRED" && "text-blue-600"}`}
                >
                  {getStatusLabel(rental.status)}
                </span>
                <div className="relative">
                  <select
                    disabled={
                      rental.status === "ACTIVE" || rental.status === "EXPIRED"
                    }
                    value={rental.status}
                    onChange={(e) => {
                      handleStatusChange(rental.id, e.target.value);
                      setIsRefresh(true);
                    }}
                    name="status"
                    id="status"
                    className={`appearance-none w-full border border-transparent rounded px-3 py-2 pr-8 outline-none disabled:cursor-not-allowed`}
                  >
                    <option value="">
                      {translations?.chooseStatus ||
                        (language === "ar" ? "اختر" : "Choose")}
                    </option>
                    <option value="CANCELLED">
                      {translations?.cancelledStatus ||
                        (language === "ar" ? "ملغاة" : "Cancelled")}
                    </option>
                    <option value="CONFIRMED">
                      {translations?.confirmedStatus ||
                        (language === "ar" ? "مؤكدة" : "Confirmed")}
                    </option>
                    <option value="ACTIVE">
                      {translations?.activeStatus ||
                        (language === "ar" ? "نشطة" : "Active")}
                    </option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                  />
                </div>
                <span
                  className={`text-center  text-secondary text-xs py-2 whitespace-break-spaces   px-5 `}
                >
                  {rental.status === "ACTIVE" || rental.status === "EXPIRED"
                    ? rental.pickup_at
                    : null}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default Rentals;
