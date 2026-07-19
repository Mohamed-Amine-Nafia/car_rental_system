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

function CarsIconSlider() {
  const cars = [
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
  ];
  return (
    <div className="flex relative h-10 w-full overflow-hidden ">
      {cars.map((car, index) => {
        return (
          <div
            key={car}
            className={`absolute left-full animate-slideIn h-full w-[calc(100%/${cars.length - 1})]`}
            style={{
              animationDelay: `-${index}s`,
            }}
          >
            <img
              className="w-8  lg:w-11 h-full aspect-square"
              src={car}
              alt="car"
            />
          </div>
        );
      })}
    </div>
  );
}

export default CarsIconSlider;
