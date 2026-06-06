import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function Rentals() {
  const [rentals, setRentals] = useState([]);

  const [clients, setClients] = useState([]);

  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await fetch(
          "http://localhost/car_rental/fetch-rentals.php",
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
  }, []);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          "http://localhost/car_rental/fetch-clients.php",
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

      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative h-screen w-full bg-primary  p-6">
      <h2 className="text-2xl text-secondary font-semibold mt-6  border-b border-ternary pb-2.5">
        RESERVATIONS
      </h2>
      <div className="mt-10">
        <div className={`flex items-center justify-between text-xs w-full`}>
          <span
            className={`text-left bg-secondary text-ternary w-[12.5%] py-2  px-5 border-l border-ternary rounded-tl-full rounded-bl-full`}
          >
            N°
          </span>
          <span
            className={`text-left bg-secondary text-ternary w-[12.5%] py-2  px-5 border-l border-ternary`}
          >
            CLIENT:
          </span>
          <span
            className={`text-left bg-secondary text-ternary w-[12.5%] py-2  px-5 border-l border-ternary`}
          >
            TELEPHONE:
          </span>
          <span
            className={`text-left bg-secondary text-ternary w-[12.5%] py-2  px-5 border-l border-ternary`}
          >
            N° PERMIS
          </span>
          <span
            className={`text-left bg-secondary text-ternary w-[12.5%] py-2  px-5 border-l border-ternary`}
          >
            VEHICULE
          </span>
          <span
            className={`text-left bg-secondary text-ternary w-[12.5%] py-2  px-5 border-l border-ternary`}
          >
            MATRICULE
          </span>
          <span
            className={`text-left bg-secondary text-ternary w-[12.5%] py-2  px-5 border-l border-ternary`}
          >
            DEBUT
          </span>
          <span
            className={`text-left bg-secondary text-ternary w-[12.5%] py-2  px-5 border-l border-ternary`}
          >
            FIN
          </span>
          <span
            className={`text-left bg-secondary text-ternary w-[12.5%] py-2  px-5 border-l border-ternary `}
          >
            STATUS
          </span>
          <span
            className={`text-left bg-secondary text-ternary w-[12.5%] py-2  px-5 border-l border-ternary `}
          >
            OPERATIONS
          </span>
          <span
            className={`text-left bg-secondary text-ternary w-[12.5%] py-2  px-5 border-l border-ternary rounded-tr-full rounded-br-full`}
          >
            Prise en charge
          </span>
        </div>

        {rentals &&
          rentals.map((rental, index) => {
            const client = getClientInfos(rental.client_id);
            const car = getCarInfos(rental.car_id);
            return (
              <div
                key={rental.id}
                className="flex items-center text-sm bg-primary w-full h-10 rounded-full border border-gray-100 whitespace-nowrap text-left hover:bg-accent cursor-pointer duration-200 ease-linear"
              >
                <span
                  className={`text-left  text-secondary w-[12.5%] py-2   px-5  `}
                >
                  {index + 1}
                </span>
                <span
                  className={`text-left  text-secondary w-[12.5%] py-2   px-5 `}
                >
                  {client?.name}
                </span>
                <span
                  className={`text-left  text-secondary w-[12.5%] py-2   px-5 `}
                >
                  {client?.phone}
                </span>
                <span
                  className={`text-left  text-secondary w-[12.5%] py-2   px-5 `}
                >
                  {client?.license}
                </span>
                <span
                  className={`text-left  text-secondary w-[12.5%] py-2   px-5 `}
                >
                  {car?.brand} {car?.model}
                </span>
                <span
                  className={`text-left  text-secondary w-[12.5%] py-2   px-5 `}
                >
                  {car?.plate}
                </span>
                <span
                  className={`text-left  text-secondary w-[12.5%] py-2   px-5 `}
                >
                  {rental.start_date}
                </span>
                <span
                  className={`text-left  text-secondary w-[12.5%] py-2   px-5 `}
                >
                  {rental.end_date}
                </span>
                <span
                  className={`text-left  w-[12.5%] py-2 rounded-full h-fit   px-5 ${rental.status === "PENDING" && " text-orange-600"} ${rental.status === "CANCELLED" && " text-red-600"} ${rental.status === "CONFIRMED" && " text-emerald-600"} ${rental.status === "ACTIVE" && " text-violet-600"}`}
                >
                  {rental.status}
                </span>
                <div className="relative w-[12.5%]">
                  <select
                    value={rental.status}
                    onChange={(e) =>
                      handleStatusChange(rental.id, e.target.value)
                    }
                    name="status"
                    id="status"
                    className={`appearance-none w-full border border-transparent rounded px-3 py-2 pr-8 outline-none`}
                  >
                    <option value="">Choisir</option>
                    <option value="CANCELLED">Annulé</option>
                    <option value="CONFIRMED">Confirmé</option>
                    <option value="ACTIVE">Active</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                  />
                </div>
                <span
                  className={`text-left  text-secondary w-[12.5%] py-2   px-5 `}
                >
                  {rental.status === "ACTIVE" ? rental.pickup_at : null}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default Rentals;
