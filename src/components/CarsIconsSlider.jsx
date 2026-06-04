const carsIcons = [
  {
    id: 0,
    carImage: "bmw",
  },
  {
    id: 1,
    carImage: "ferrari",
  },
  {
    id: 2,
    carImage: "mercedes",
  },
  {
    id: 3,
    carImage: "porsche",
  },
  {
    id: 4,
    carImage: "renault",
  },
  {
    id: 5,
    carImage: "dacia",
  },
  {
    id: 6,
    carImage: "fiat",
  },
  {
    id: 7,
    carImage: "ford",
  },
  {
    id: 8,
    carImage: "citroen",
  },
  {
    id: 9,
    carImage: "nissan",
  },
];
function CarsIconSlider() {
  return (
    <div className="flex relative h-10 w-full overflow-hidden ">
      {carsIcons.map((car, index) => {
        return (
          <div
            key={car.id}
            className={`absolute left-full animate-slideIn h-full w-[11.11%]`}
            style={{
              animationDelay: `-${index}s`,
            }}
          >
            <img
              className="w-11 h-full"
              src={`../../src/assets/images/cars_icons/${car.carImage}.png`}
              alt="car"
            />
          </div>
        );
      })}
    </div>
  );
}

export default CarsIconSlider;
