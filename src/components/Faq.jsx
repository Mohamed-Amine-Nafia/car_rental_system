import { ArrowBigLeft, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    id: 0,
    q: "Comment réserver une voiture ?",
    a: "Choisissez votre véhicule, sélectionnez les dates de location et envoyez le formulaire de réservation. Notre équipe vous contactera pour confirmer la disponibilité.",
  },
  {
    id: 1,
    q: "La réservation en ligne est-elle définitive ?",
    a: "Non. Le formulaire en ligne est une demande de pré-réservation. La réservation est confirmée après vérification de la disponibilité par notre équipe.",
  },
  {
    id: 2,
    q: "Puis-je modifier ou annuler ma réservation ?",
    a: "Oui, contactez-nous le plus tôt possible pour modifier ou annuler votre réservation.",
  },
  {
    id: 3,
    q: "Quels documents sont nécessaires pour louer une voiture ?",
    a: "Un permis de conduire valide, une carte d’identité ou un passeport, ainsi que tout autre document exigé par la réglementation locale.",
  },
  {
    id: 4,
    q: "Quel est l’âge minimum pour louer une voiture ?",
    a: "L’âge minimum est généralement de 21 ans, mais il peut varier selon la catégorie du véhicule.",
  },
  {
    id: 5,
    q: "Les touristes étrangers peuvent-ils louer une voiture ?",
    a: "Oui, les visiteurs peuvent louer une voiture avec un permis de conduire valide et un passeport.",
  },
];

function Faq() {
  const [isActive, setActive] = useState(null);

  return (
    <div id="faqs" className="mt-10 p-5">
      <div className="flex items-center gap-1.5 text-secondary">
        <h3 className="text-xl md:text-2xl border-b-2 font-medium">FAQS </h3>
        <span className="text-xs md:text-sm text-text-secondary">
          (Les questions fréquentes)
        </span>
      </div>
      <div className="mt-8 flex flex-col gap-0.5">
        {faqs.map((faq, index) => {
          return (
            <div key={faq.id} className="flex flex-col">
              <h4
                onClick={() => setActive(index)}
                className="bg-ternary text-secondary py-2.5 px-4 cursor-pointer border-b border-b-ternary hover:bg-accent hover:text-secondary duration-200 ease-linear rounded-xl inline-flex items-center justify-between text-sm md:text-base "
              >
                Q : {faq.q}
                <span
                  className={`${isActive === index ? "rotate-180" : "rotate-0"} duration-200 ease-linear`}
                >
                  <ChevronDown />
                </span>
              </h4>
              <p
                className={`${isActive === index ? "h-fit px-2 py-3" : "h-0"} overflow-hidden  duration-200 ease-linear rounded-xl text-xs md:text-sm`}
              >
                R : {faq.a}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Faq;
