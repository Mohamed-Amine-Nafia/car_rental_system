import { Check, Cross, CrossIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

function UpdateCar({ onUpdate, showUpdateForm, car }) {
  const [updateCar, setUpdateCar] = useState(car || {});
  const [updateMessage, setUpdateMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUpdateCar((prev) => ({ ...prev, [name]: value }));
  }

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/car_rental/update-car.php", {
        method: "PATCH",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify(updateCar),
      });
      const data = await res.json();
      setUpdateMessage("Voiture mise à jour avec succès");
      setSuccess(true);
    } catch (error) {
      setUpdateMessage("Échec de la mise à jour de la voiture");
      setError(true);
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ternary rounded-md  max-w-xl p-8  transition duration-300 ease-in-out ${showUpdateForm ? "scale-100" : "scale-0"}`}
    >
      <span
        onClick={() => onUpdate(false)}
        className="absolute top-2 right-2 cursor-pointer bg-ternary p-1 rounded-full hover:bg-accent transition duration-300 ease-linear"
      >
        <X />
      </span>
      <form onSubmit={(e) => handleUpdateCar(e)} className="text-xs w-full">
        <label htmlFor="brand">Marque:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="brand"
          name="brand"
          placeholder="Marque"
          defaultValue={car.brand}
          onChange={handleChange}
        />
        <label htmlFor="model">Modele:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="model"
          name="model"
          placeholder="Modele"
          defaultValue={car.model}
          onChange={handleChange}
        />
        <label htmlFor="year">Anneé:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="year"
          name="year"
          placeholder="Anneé"
          defaultValue={car.year}
          onChange={handleChange}
        />
        <label htmlFor="plate">Matricule:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="plate"
          name="plate"
          placeholder="??-?-?????"
          defaultValue={car.plate}
          onChange={handleChange}
        />
        <label htmlFor="price">Prix par jour:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="price"
          name="price"
          placeholder="Prix"
          defaultValue={car.price}
          onChange={handleChange}
        />
        <label htmlFor="image">Image:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="file"
          name="image"
          accept="image/*"
        ></input>
        <label htmlFor="status">Etat:</label>
        <select
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          name="status"
          id="status"
          defaultValue={car.status}
          onChange={handleChange}
        >
          <option value="">--choisir--</option>
          <option value="disponible">Disponible</option>
          <option value="reservé">Reservé</option>
          <option value="repair">Repair</option>
        </select>
        <label htmlFor="fuel">Carburant:</label>
        <select
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          name="fuel"
          id="fuel"
          defaultValue={car.fuel}
          onChange={handleChange}
        >
          <option value="">--choisir--</option>
          <option value="essence">Essence</option>
          <option value="gasoil">Gasoil</option>
        </select>
        <label htmlFor="transmission">Transmission:</label>
        <select
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          name="transmission"
          id="transmission"
          defaultValue={car.transmission}
          onChange={handleChange}
        >
          <option value="">--choisir--</option>
          <option value="automatique">Automatique</option>
          <option value="manuelle">Manuelle</option>
        </select>

        <input
          className="w-full py-2 inline-flex bg-secondary text-ternary mt-4 text-sm font-normal rounded-sm cursor-pointer hover:bg-accent hover:text-secondary transition duration-300 ease-linear"
          type="submit"
          value="Mettre à jour"
        />
      </form>
      {(success || error) && (
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border ${success ? "border-green-400" : "border-red-400"} bg-primary rounded-md py-5 px-8 flex flex-col gap-5 items-center`}
        >
          {success && (
            <Check
              size={36}
              className="bg-green-100 text-green-600 p-1.5 rounded-full"
            />
          )}
          {error && (
            <X
              size={36}
              className="bg-red-100 text-red-600 p-1.5 rounded-full"
            />
          )}

          <p className="text-sm text-center">{updateMessage}</p>
        </div>
      )}
    </div>
  );
}

export default UpdateCar;
