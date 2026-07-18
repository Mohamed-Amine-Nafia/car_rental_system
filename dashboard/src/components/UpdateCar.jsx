import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

import { API_URL } from "../config/api";

function UpdateCar({
  onUpdate,
  showUpdateForm,
  car,
  onRefresh,
  language,
  translations,
}) {
  const [updateCar, setUpdateCar] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // FIX: sync state when car changes
  useEffect(() => {
    if (car) {
      setUpdateCar(car);
    }
  }, [car]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUpdateCar((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleUpdateCar = async (e) => {
    e.preventDefault();

    setSuccess(false);
    setError(false);
    setUpdateMessage("");

    try {
      const payload = {
        ...updateCar,
        car_id: car.car_id, // IMPORTANT FIX
      };

      const res = await fetch(`${API_URL}/update-car.php`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.status !== "success") {
        throw new Error(
          data.message || translations?.updateCarFail || "Update failed",
        );
      }

      setSuccess(true);
      setUpdateMessage(
        data.message ||
          translations?.updateCarSuccess ||
          "Car updated successfully",
      );

      // refresh parent list
      if (onRefresh) onRefresh(true);
    } catch (err) {
      setError(true);
      setUpdateMessage(err.message);
    }
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ternary rounded-md max-w-xl p-8 transition duration-300 ease-in-out ${
        showUpdateForm ? "scale-100" : "scale-0"
      }`}
    >
      <span
        onClick={() => onUpdate(false)}
        className="absolute top-2 right-2 cursor-pointer bg-ternary p-1 rounded-full hover:bg-accent transition duration-300 ease-linear"
      >
        <X />
      </span>

      <form onSubmit={handleUpdateCar} className="text-xs w-full">
        <label>{translations?.brand || "Brand"}:</label>
        <input
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="brand"
          value={updateCar.brand || ""}
          onChange={handleChange}
        />

        <label>{translations?.model || "Model"}:</label>
        <input
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="model"
          value={updateCar.model || ""}
          onChange={handleChange}
        />

        <label>{translations?.year || "Year"}:</label>
        <input
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="year"
          value={updateCar.year || ""}
          onChange={handleChange}
        />

        <label>{translations?.plate || "Plate"}:</label>
        <input
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="plate"
          value={updateCar.plate || ""}
          onChange={handleChange}
        />

        <label>{translations?.price || "Price per day"}:</label>
        <input
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="price"
          value={updateCar.price || ""}
          onChange={handleChange}
        />

        {/* KEEP IMAGE UI (NO LOGIC CHANGE) */}
        <label>{translations?.image || "Image"}:</label>
        <input
          className="w-full bg-primary p-2 rounded-sm my-2"
          type="file"
          name="image"
          accept="image/*"
        />

        <label>{translations?.status || "Status"}:</label>
        <select
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="status"
          value={updateCar.status || ""}
          onChange={handleChange}
        >
          <option value="">{translations?.choose || "--choose--"}</option>
          <option value="available">
            {translations?.available || "Available"}
          </option>
          <option value="reserved">
            {translations?.reserved || "Reserved"}
          </option>
          <option value="repair">{translations?.repair || "Repair"}</option>
        </select>

        <label>{translations?.fuel || "Fuel"}:</label>
        <select
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="fuel"
          value={updateCar.fuel || ""}
          onChange={handleChange}
        >
          <option value="">{translations?.choose || "--choose--"}</option>
          <option value="essence">
            {translations?.gasoline || "Gasoline"}
          </option>
          <option value="gasoil">{translations?.diesel || "Diesel"}</option>
        </select>

        <label>{translations?.transmission || "Transmission"}:</label>
        <select
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="transmission"
          value={updateCar.transmission || ""}
          onChange={handleChange}
        >
          <option value="">{translations?.choose || "--choose--"}</option>
          <option value="automatique">
            {translations?.automatic || "Automatic"}
          </option>
          <option value="manuelle">{translations?.manual || "Manual"}</option>
        </select>

        <input
          className="w-full py-2 bg-secondary text-ternary mt-4 rounded-sm cursor-pointer"
          type="submit"
          value={translations?.update || "Update"}
        />
      </form>

      {(success || error) && (
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-secondary bg-primary rounded-md py-5 px-8 flex flex-col gap-2 items-center`}
        >
          {success && (
            <Check
              size={28}
              className="text-green-600 bg-green-100 p-1 rounded-full"
            />
          )}
          {error && (
            <X size={28} className="text-red-600 bg-red-100 p-1 rounded-full" />
          )}

          <p className="text-[12px] text-center">{updateMessage}</p>
          <button
            onClick={() => onUpdate(false)}
            className="text-xs inline-flex items-center bg-secondary text-ternary hover:bg-accent hover:text-secondary duration-200 ease-linear cursor-pointer py-1.5 px-3 rounded-full mt-2.5"
          >
            {translations?.ok || "OK"}
          </button>
        </div>
      )}
    </div>
  );
}

export default UpdateCar;
