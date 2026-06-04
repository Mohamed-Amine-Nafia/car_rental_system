function RentalSteps({ isDarkMode }) {
  return (
    <div id="rental-steps" className="p-5">
      <div className="flex gap-1.5 items-center">
        <h2
          className={`text-xl md:text-2xl font-medium border-b-2  whitespace-nowrap ${isDarkMode ? "text-ternary border-ternary" : "text-secondary border-secondary"}`}
        >
          LES ETAPES
        </h2>
        <span
          className={`text-xs md:text-sm whitespace-nowrap ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
        >
          (Comment ça marche)
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4">
        <div
          className={`p-5 rounded-xl hover:bg-accent duration-200 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary ${isDarkMode ? "bg-gray-900 border-gray-950" : "bg-ternary-fade border-ternary"} border-2 `}
        >
          <h4
            className={` md:text-lg ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            1. Choisissez votre véhicule
          </h4>
          <p
            className={`text-xs md:text-sm mt-2 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            Parcourez notre flotte et sélectionnez le véhicule qui vous
            convient.
          </p>
        </div>
        <div
          className={`p-5 rounded-xl hover:bg-accent duration-200 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary border-2 ${isDarkMode ? "bg-gray-900 border-gray-950" : "bg-ternary-fade border-ternary"}`}
        >
          <h4
            className={` md:text-lg ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            2. Sélectionnez vos dates
          </h4>
          <p
            className={`text-xs md:text-sm mt-2 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            Indiquez les dates de prise en charge et de retour souhaitées.
          </p>
        </div>
        <div
          className={`p-5 rounded-xl hover:bg-accent duration-200 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary border-2 ${isDarkMode ? "bg-gray-900 border-gray-950" : "bg-ternary-fade border-ternary"}`}
        >
          <h4
            className={` md:text-lg ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            3. Effectuez une pré-réservation
          </h4>
          <p
            className={`text-xs md:text-sm mt-2 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            Remplissez vos coordonnées et envoyez votre demande.
          </p>
        </div>
        <div
          className={`p-5 rounded-xl hover:bg-accent duration-200 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary border-2 ${isDarkMode ? "bg-gray-900 border-gray-950" : "bg-ternary-fade border-ternary"}`}
        >
          <h4
            className={` md:text-lg ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            4. Confirmation de la demande
          </h4>
          <p
            className={`text-xs md:text-sm mt-2 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            Notre équipe vous contacte pour confirmer la disponibilité du
            véhicule.
          </p>
        </div>
        <div
          className={`p-5 rounded-xl hover:bg-accent duration-200 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary border-2 ${isDarkMode ? "bg-gray-900 border-gray-950" : "bg-ternary-fade border-ternary"}`}
        >
          <h4
            className={` md:text-lg ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            5. Rendez-vous à l'agence
          </h4>
          <p
            className={`text-xs md:text-sm mt-2 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            Présentez les documents nécessaires et finalisez le contrat de
            location.
          </p>
        </div>
        <div
          className={`p-5 rounded-xl hover:bg-accent duration-200 ease-linear cursor-pointer hover:[&>*:nth-child(1)]:text-secondary hover:[&>*:nth-child(2)]:text-text-secondary border-2 ${isDarkMode ? "bg-gray-900 border-gray-950" : "bg-ternary-fade border-ternary"}`}
        >
          <h4
            className={` md:text-lg ${isDarkMode ? "text-ternary" : "text-secondary"}`}
          >
            6. Récupérez votre véhicule
          </h4>
          <p
            className={`text-xs md:text-sm mt-2 ${isDarkMode ? "text-text-ternary" : "text-text-secondary"}`}
          >
            Prenez votre voiture et profitez de votre trajet.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RentalSteps;
