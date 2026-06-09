import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

function UpdateCar({ onUpdate, showUpdateForm, car, onRefresh }) {
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

      const res = await fetch("http://localhost/car_rental/update-car.php", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.status !== "success") {
        throw new Error(data.message || "Update failed");
      }

      setSuccess(true);
      setUpdateMessage(data.message || "Voiture mise à jour avec succès");

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
        <label>Marque:</label>
        <input
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="brand"
          value={updateCar.brand || ""}
          onChange={handleChange}
        />

        <label>Modele:</label>
        <input
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="model"
          value={updateCar.model || ""}
          onChange={handleChange}
        />

        <label>Anneé:</label>
        <input
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="year"
          value={updateCar.year || ""}
          onChange={handleChange}
        />

        <label>Matricule:</label>
        <input
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="plate"
          value={updateCar.plate || ""}
          onChange={handleChange}
        />

        <label>Prix par jour:</label>
        <input
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="price"
          value={updateCar.price || ""}
          onChange={handleChange}
        />

        {/* KEEP IMAGE UI (NO LOGIC CHANGE) */}
        <label>Image:</label>
        <input
          className="w-full bg-primary p-2 rounded-sm my-2"
          type="file"
          name="image"
          accept="image/*"
        />

        <label>Etat:</label>
        <select
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="status"
          value={updateCar.status || ""}
          onChange={handleChange}
        >
          <option value="">--choisir--</option>
          <option value="disponible">Disponible</option>
          <option value="reservé">Reservé</option>
          <option value="repair">Repair</option>
        </select>

        <label>Carburant:</label>
        <select
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="fuel"
          value={updateCar.fuel || ""}
          onChange={handleChange}
        >
          <option value="">--choisir--</option>
          <option value="essence">Essence</option>
          <option value="gasoil">Gasoil</option>
        </select>

        <label>Transmission:</label>
        <select
          className="w-full bg-primary p-2 rounded-sm my-2"
          name="transmission"
          value={updateCar.transmission || ""}
          onChange={handleChange}
        >
          <option value="">--choisir--</option>
          <option value="automatique">Automatique</option>
          <option value="manuelle">Manuelle</option>
        </select>

        <input
          className="w-full py-2 bg-secondary text-ternary mt-4 rounded-sm cursor-pointer"
          type="submit"
          value="Mettre à jour"
        />
      </form>

      {(success || error) && (
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border ${
            success ? "border-green-400" : "border-red-400"
          } bg-primary rounded-md py-5 px-8 flex flex-col gap-5 items-center`}
        >
          {success && (
            <Check className="text-green-600 bg-green-100 p-1 rounded-full" />
          )}
          {error && <X className="text-red-600 bg-red-100 p-1 rounded-full" />}

          <p className="text-sm text-center">{updateMessage}</p>
        </div>
      )}
    </div>
  );
}

export default UpdateCar;
