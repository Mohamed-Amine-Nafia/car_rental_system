function IntroSection() {
  return (
    <section className="flex flex-col md:flex-row  md:items-center">
      <div className="mt-5 md:mt-0 p-5 md:w-1/2">
        <h2 className="text-2xl font-semibold md:text-4xl lg:text-5xl">
          Votre prochaine grande évasion{" "}
          <span className="italic font-normal text-accent">commence ici.</span>
        </h2>
        <p className="mt-4 leading-6 text-text-secondary">
          La voiture que vous voulez, au moment exact où vous en avez besoin.
          Consultez notre inventaire en temps réel et prenez le volant en
          quelques minutes.
        </p>
        <div className="mt-4">
          <button className="bg-secondary text-ternary py-2.5 px-8 rounded-full hover:bg-accent hover:text-secondary duration-300 ease-linear cursor-pointer">
            Reserver
          </button>
        </div>
      </div>
      <div className="md:w-1/2">
        <img
          className="w-full aspect-square [-webkit-box-reflect:below_2px_linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4))]"
          src="../src/assets/images/car_4.png"
          alt=""
        />
      </div>
    </section>
  );
}

export default IntroSection;
