import { Check, X } from "lucide-react";

import { useState } from "react";

function AddNewCar({ onClick, showform }) {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    plate: "",
    price: "",
    status: "",
  });

  const [image, setImage] = useState(null);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    // append text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // append image
    data.append("image", image);

    try {
      const response = await fetch("http://localhost/car_rental/add-car.php", {
        method: "POST",
        credentials: "include",
        body: data,
      });

      const result = await response.json();

      if (!result.success) {
        setMessage(result.message);
        onClick(false);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
    setFormData({
      brand: "",
      model: "",
      year: "",
      plate: "",
      price: "",
      status: "",
      fuel: "",
      transmission: "",
    });
    setMessage("");
  }

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ternary rounded-md  max-w-xl p-8 ${showform ? "scale-100" : "scale-0"} transition duration-300 ease-in-out`}
    >
      <span
        onClick={() => onClick(false)}
        className="absolute top-2 right-2 cursor-pointer bg-ternary p-1 rounded-full hover:bg-accent transition duration-300 ease-linear"
      >
        <X />
      </span>
      <form onSubmit={handleSubmit} className="text-xs w-full">
        <label htmlFor="brand">Marque:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="brand"
          name="brand"
          placeholder="Marque"
          onChange={handleChange}
          value={formData.brand}
        />
        <label htmlFor="model">Modele:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="model"
          name="model"
          placeholder="Modele"
          onChange={handleChange}
          value={formData.model}
        />
        <label htmlFor="year">Anneé:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="year"
          name="year"
          placeholder="Anneé"
          onChange={handleChange}
          value={formData.year}
        />
        <label htmlFor="plate">Matricule:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="plate"
          name="plate"
          placeholder="68-123456-أ"
          onChange={handleChange}
          value={formData.plate}
        />
        <label htmlFor="price">Prix par jour:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="price"
          name="price"
          placeholder="Prix"
          onChange={handleChange}
          value={formData.price}
        />
        <label htmlFor="image">Image:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="file"
          name="image"
          accept="image/*"
          required
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <label htmlFor="status">Etat:</label>
        <select
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          name="status"
          id="status"
          onChange={handleChange}
          value={formData.status}
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
          onChange={handleChange}
          value={formData.fuel}
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
          onChange={handleChange}
          value={formData.transmission}
        >
          <option value="">--choisir--</option>
          <option value="automatique">Automatique</option>
          <option value="manuelle">Manuelle</option>
        </select>

        <input
          className="w-full py-2 inline-flex bg-secondary text-ternary mt-4 text-sm font-normal rounded-sm cursor-pointer hover:bg-accent hover:text-secondary transition duration-300 ease-linear"
          type="submit"
          value="Ajouter"
        />
      </form>
      {message && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary py-5 px-12 rounded-sm flex flex-col items-center gap-5">
          <Check
            className="bg-green-100 text-green-600 p-1 rounded-full"
            size={32}
          />
          <p className="text-xs text-secondary text-center">{message}</p>
        </div>
      )}
    </div>
  );
}

export default AddNewCar;
