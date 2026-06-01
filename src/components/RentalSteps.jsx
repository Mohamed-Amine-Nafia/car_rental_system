function RentalSteps() {
  return (
    <div id="rental-steps" className="p-5">
      <div className="flex gap-1.5 items-center">
        <h2 className="text-xl border-b-2 md:text-2xl font-medium">
          LES ETAPES
        </h2>
        <span className="text-xs md:text-sm text-text-secondary">
          (Comment ça marche)
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4">
        <div className="bg-secondary p-5 rounded-xl hover:bg-accent duration-300 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary">
          <h4 className="text-ternary md:text-lg  ">
            1. Choisissez votre véhicule
          </h4>
          <p className="text-text-ternary text-xs md:text-sm mt-2">
            Parcourez notre flotte et sélectionnez le véhicule qui vous
            convient.
          </p>
        </div>
        <div className="bg-secondary p-5 rounded-xl  hover:bg-accent duration-300 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary">
          <h4 className="text-ternary md:text-lg">2. Sélectionnez vos dates</h4>
          <p className="text-text-ternary text-xs md:text-sm mt-2">
            Indiquez les dates de prise en charge et de retour souhaitées.
          </p>
        </div>
        <div className="bg-secondary p-5 rounded-xl  hover:bg-accent duration-300 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary">
          <h4 className="text-ternary md:text-lg">
            3. Effectuez une pré-réservation
          </h4>
          <p className="text-text-ternary text-xs md:text-sm mt-2">
            Remplissez vos coordonnées et envoyez votre demande.
          </p>
        </div>
        <div className="bg-secondary p-5 rounded-xl  hover:bg-accent duration-300 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary">
          <h4 className="text-ternary md:text-lg">
            4. Confirmation de la demande
          </h4>
          <p className="text-text-ternary text-xs md:text-sm mt-2">
            Notre équipe vous contacte pour confirmer la disponibilité du
            véhicule.
          </p>
        </div>
        <div className="bg-secondary p-5 rounded-xl  hover:bg-accent duration-300 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary">
          <h4 className="text-ternary md:text-lg">5. Rendez-vous à l'agence</h4>
          <p className="text-text-ternary text-xs md:text-sm mt-2">
            Présentez les documents nécessaires et finalisez le contrat de
            location.
          </p>
        </div>
        <div className="bg-secondary p-5 rounded-xl  hover:bg-accent duration-300 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary">
          <h4 className="text-ternary md:text-lg">
            6. Récupérez votre véhicule
          </h4>
          <p className="text-text-ternary text-xs md:text-sm mt-2">
            Prenez votre voiture et profitez de votre trajet.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RentalSteps;
