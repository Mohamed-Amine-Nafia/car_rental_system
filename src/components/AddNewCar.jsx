import { X } from "lucide-react";

import { useState } from "react";

function AddNewCar({ onClick }) {
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
        body: data,
      });

      const result = await response.json();

      console.log(result);

      if (result.success) {
        alert("Car added successfully");
        onClick(false);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ternary rounded-md  max-w-md p-8">
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
        />
        <label htmlFor="model">Modele:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="model"
          name="model"
          placeholder="Modele"
          onChange={handleChange}
        />
        <label htmlFor="year">Anneé:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="year"
          name="year"
          placeholder="Anneé"
          onChange={handleChange}
        />
        <label htmlFor="plate">Matricule:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="plate"
          name="plate"
          placeholder="Matricule"
          onChange={handleChange}
        />
        <label htmlFor="price">Prix par jour:</label>
        <input
          className="w-full bg-primary border-0 outline-0 p-2 rounded-sm my-2"
          type="text"
          id="price"
          name="price"
          placeholder="Prix"
          onChange={handleChange}
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
        >
          <option value="">--choisir--</option>
          <option value="disponible">Disponible</option>
          <option value="reserve">Reservé</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <input
          className="w-full py-1.5 inline-flex bg-secondary text-ternary mt-4 text-sm font-normal rounded-sm cursor-pointer hover:bg-accent hover:text-secondary transition duration-300 ease-linear"
          type="submit"
          value="Ajouter"
        />
      </form>
    </div>
  );
}

export default AddNewCar;
