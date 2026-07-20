import { Check, Cog, Fuel, X } from "lucide-react";
import { useEffect, useState } from "react";

import { API_URL } from "../config/api";


import bmw from "../../src/assets/images/cars_icons/bmw.png";
import ferrari from "../../src/assets/images/cars_icons/ferrari.png";
import mercedes from "../../src/assets/images/cars_icons/mercedes.png";
import porsche from "../../src/assets/images/cars_icons/porsche.png";
import renault from "../../src/assets/images/cars_icons/renault.png";
import dacia from "../../src/assets/images/cars_icons/dacia.png";
import ford from "../../src/assets/images/cars_icons/ford.png";
import nissan from "../../src/assets/images/cars_icons/nissan.png";
import kia from "../../src/assets/images/cars_icons/kia.png";
import skoda from "../../src/assets/images/cars_icons/skoda.png";


  const carsIcons = {
    bmw,
    ferrari,
    mercedes,
    porsche,
    renault,
    dacia,
    ford,
    nissan,
    kia,
    skoda,
  };


function Cars({ isDarkMode, language }) {
  const [cars, setCars] = useState([]);
  const [reservedCar, setReservedCar] = useState(null);
  const [isFormShown, setIsFormShown] = useState(false);

  const [rentalId, setRentalId] = useState(null);
  // CHANGED: We now track the PDF file path instead of raw HTML string
  const [contractFilePath, setContractFilePath] = useState("");
  const [showContract, setShowContract] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [rentalInfos, setRentalInfos] = useState({
    startDate: "",
    endDate: "",
    fullName: "",
    phone: "",
    license: "",
  });

console.log(API_URL);

  const [carId, setCarId] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_URL}/fetch-available-cars.php`,{
          method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "include"
        });
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
      const response = await fetch(`${API_URL}/rentals.php`, {
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
        setErrorMessage(data.message || "Server error");
        return;
      }
      if (response.ok && data.success) {
        await handleCarStatus(reservedCar.car_id, "reserved");

        setSuccessMessage(data.message);

        const newRentalId = data.rental_id;
        setRentalId(newRentalId);

        setTimeout(() => {
          setIsFormShown(false);

          window.dispatchEvent(
            new CustomEvent("open-contract", {
              detail: { rentalId: newRentalId },
            }),
          );
        }, 800);
      }

      setSuccessMessage(data.message);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // CHANGED: Listens for rentalId to request the file path from PHP
  useEffect(() => {
    if (!rentalId) return;

    const fetchContract = async () => {
      try {
        const response = await fetch(`${API_URL}/create-contract.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rental_id: rentalId,
          }),
        });

        const data = await response.json();

        if (data.status === "success") {
          setContractFilePath(data.file_path); // Save file path path from database response
        } else {
          console.error("Error generating contract:", data.message);
        }
      } catch (error) {
        console.log("Connection error:", error);
      }
    };

    fetchContract();
  }, [rentalId]);

  useEffect(() => {
    const handler = (e) => {
      const targetId = e.detail.rentalId;
      console.log("OPEN CONTRACT FOR:", targetId);
      setRentalId(targetId);
    };

    window.addEventListener("open-contract", handler);

    return () => {
      window.removeEventListener("open-contract", handler);
    };
  }, []);

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

  function plateFormat(plate) {
    const [number, region, letter] = plate.split("-");
    return { region, letter, number };
  }

  const handleCarStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/reserved-car.php`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          car_id: id,
          status: newStatus,
        }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error: ${errorText}`);
      }
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="cars-section" className="p-5 mt-4 md:mt-10 lg:mt-16 relative">
      <div className="flex gap-1.5 items-center">
        <h2
          className={`text-xl md:text-2xl font-medium border-b-2  whitespace-nowrap ${isDarkMode ? "text-ternary border-ternary" : "text-secondary border-secondary"}`}
        >
          {language === "en" ? "OUR FLEET" : "أسطولنا"}
        </h2>
        <span
          className={`text-xs md:text-sm whitespace-nowrap ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
        >
          {language === "en" ? "Available cars" : "السيارات المتوفرة"}
        </span>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
        {cars.map((car) => {
          const plate = plateFormat(car.plate);
          return (
            <div
              className={`relative flex flex-col justify-between h-70 border-2  rounded-xl cursor-pointer ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-ternary-fade border-ternary "}`}
              key={car.car_id}
            >
              <img
                className="absolute w-4/6 md:w-4/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105 duration-300 ease-linear"
                src={`${API_URL}/uploads/cars/${car.image}`}
                alt="car"
              />
              <div className="p-3 flex items-center gap-4">
                <img
                  className="w-8 h-8 md:w-10 md:h-10 "
                  src={carsIcons[car.brand]}
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
                  <span
                    className={`ml-1 text-xs  ${isDarkMode ? "text-ternary" : "text-text-secondary"}`}
                  >
                    {car.year}
                  </span>
                  <br />
                  <span
                    dir="ltr"
                    className={` ${isDarkMode ? "text-ternary" : "text-text-secondary"} text-sm`}
                  >
                    {plate.region}-<span dir="rtl">{plate.letter}</span>-
                    {plate.number}
                  </span>
                </div>
              </div>
              <div className="bg-black/5 p-3 backdrop-blur-2xl rounded-br-xl rounded-bl-xl relative">
                <div>
                  <span
                    className={`text-lg ${isDarkMode ? "text-primary" : "text-secondary"}`}
                  >
                    {car.price} {language === "en" ? "MAD" : "درهم"}
                  </span>
                  <span
                    className={` ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
                  >
                    {language === "en" ? "/Day" : "/اليوم"}
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
                  onClick={() => {
                    handleClick(car);
                    setCarId(car.car_id);
                  }}
                  className={`absolute top-1/2 -translate-y-1/2 right-3  py-1.5 px-4 rounded-full text-sm  hover:bg-accent hover:text-secondary duration-200 ease-linear cursor-pointer ${isDarkMode ? "bg-ternary text-secondary" : "bg-secondary text-ternary"}`}
                >
                  {language === "en" ? "Reserve" : "قم بالحجز"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/**THE RESERVATION FORM */}
      {reservedCar && isFormShown && (
        <div
          className={`absolute w-11/12 md:max-w-11/12 lg:max-w-3/4 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col md:flex-row  rounded-lg p-3 z-40 ${isDarkMode ? "bg-gray-900 text-ternary border-2 border-gray-800" : "bg-ternary text-secondary border-2 border-gray-500"}`}
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
                src={`${API_URL}/uploads/cars/${reservedCar.image}`}
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
                {rentalDays || 0} days x {reservedCar.price}
                {language === "en" ? "MAD" : "درهم"}
              </span>
              <span className="text-3xl mt-2">
                Total: {rentalDays * reservedCar.price || 0}
                {language === "en" ? "MAD" : "درهم"}
              </span>
            </div>
          </div>
          <div className="p-5 ">
            <div>
              <h3 className="text-2xl">
                {language === "en"
                  ? "Reserve this vehicle"
                  : "قم بحجز  هذه السيارة"}
              </h3>
              <p className="text-xs mt-2 leading-5">
                {language === "en"
                  ? `Fill out the form - the agency will confirm your booking`
                  : `املأ نموذج الحجز، وستتواصل معك الوكالة لتأكيد حجزك.`}
              </p>
            </div>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="mt-8 text-sm"
            >
              <label htmlFor="start-date">
                {language === "en" ? "PICKUP" : "بداية الحجز"}
              </label>

              <input
                onChange={handleChange}
                className={`w-full  text-accent py-2 px-2.5 rounded-md my-2.5 [&::-webkit-calendar-picker-indicator]:invert ${isDarkMode ? "bg-gray-800" : "bg-secondary"}`}
                type="date"
                name="startDate"
                id="start-date"
                required
              />
              <label htmlFor="end-date">
                {language === "en" ? "RETURN" : "نهاية الحجز"}
              </label>
              <input
                onChange={handleChange}
                className={`w-full  text-accent py-2 px-2.5 rounded-md my-2.5 [&::-webkit-calendar-picker-indicator]:invert ${isDarkMode ? "bg-gray-800" : "bg-secondary"}`}
                type="date"
                name="endDate"
                id="end-date"
                required
              />
              <br />
              <label htmlFor="client-name">
                {language === "en" ? "Full name" : "الاسم الكامل"}
              </label>
              <input
                onChange={handleChange}
                className={`w-full  py-2 px-2.5 my-2.5 rounded-md ${isDarkMode ? "bg-gray-800 text-ternary" : "bg-primary text-secondary"}`}
                type="text"
                name="fullName"
                id="client-name"
                placeholder="ex : Amine Nafia"
                required
              />
              <label htmlFor="phone">
                {language === "en" ? "Phone" : "الهاتف"}
              </label>
              <input
                onChange={handleChange}
                className={`w-full  py-2 px-2.5 my-2.5 rounded-md ${isDarkMode ? "bg-gray-800 text-ternary" : "bg-primary text-secondary"}`}
                type="tel"
                name="phone"
                id="phone"
                placeholder="ex : 0616454489"
                required
              />
              <label htmlFor="license">
                {language === "en"
                  ? "Driver license number"
                  : "رقم رخصة السياقة"}{" "}
              </label>
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
                value={language === "en" ? "Confirm booking" : "تأكيد الحجز"}
              />
            </form>
            <p
              className={`text-sm  mt-2.5 ${isDarkMode ? "text-text-ternary " : "text-text-secondary"}`}
            >
              {language === "en"
                ? `By submitting, you agree to be contacted by the agency to confirm this booking`
                : `بإرسال هذا الطلب، فإنك توافق على أن تتواصل معك الوكالة لتأكيد هذا الحجز.`}
            </p>
          </div>
          {(successMessage || errorMessage) && (
            <div
              className={`py-5 px-10 rounded-md flex flex-col gap-5 border-2 ${isDarkMode ? "bg-gray-800 text-ternary border-gray-700" : "bg-primary text-secondary border-gray-400"} absolute w-4/5 md:w-3/5 justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50`}
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
                  setShowContract(true);
                }}
                className={`${isDarkMode ? "bg-primary text-secondary" : "bg-secondary text-ternary"} py-1.5 px-5 rounded-full cursor-pointer hover:bg-accent hover:text-secondary duration-200 ease-linear`}
              >
                {language === "en" ? "OK" : "حسنا"}
              </button>
            </div>
          )}
        </div>
      )}

      {/** CHANGED: CONTRACT MODAL RENDERING PREVIEW VIA IFRAME */}
      {showContract && contractFilePath && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-black w-11/12 max-w-4xl h-[85vh] rounded-xl p-4 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-3 pb-2 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {language === "en" ? "Contract Preview" : "إظهار عقد الكراء"}
              </h3>
              <button
                onClick={() => {
                  setShowContract(false);
                  setRentalId(null);
                }}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* Embedded Native Browser PDF View */}
            <div className="flex-1 w-full bg-gray-100 rounded overflow-hidden">
              <iframe
                src={`${API_URL}/${contractFilePath}`}
                width="100%"
                height="100%"
                className="border-0"
                title="Contract PDF"
              />
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => {
                  setShowContract(false);
                  setRentalId(null);
                }}
                className="px-5 py-2 bg-gray-900 text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {language === "en" ? "Close" : "إغلاق"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cars;
