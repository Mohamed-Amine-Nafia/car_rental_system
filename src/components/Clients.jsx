import { IdCard, Mail, Phone, Search, User } from "lucide-react";

function Clients() {
  return (
    <div className="relative h-screen w-full bg-primary  px-6 py-3">
      <h2 className="text-2xl text-secondary font-semibold mt-6  border-b border-ternary pb-2.5">
        CLIENTS
      </h2>
      <div className="flex items-center mt-6 gap-4  border-b border-ternary pb-6">
        <div className="flex items-center relative ">
          <input
            className="bg-ternary text-xs py-2.5 pl-3 pr-16 outline-0 rounded-full"
            type="text"
            placeholder="Rechercher"
          />
          <Search className="absolute top-2 right-3 " size={18} />
        </div>
        <div className="text-xs flex items-center gap-3">
          <span className="inline-flex py-2.5 px-4 bg-secondary text-ternary rounded-full cursor-pointer hover:bg-accent hover:text-secondary transition duration-300 ease-linear">
            Confirmé
          </span>
          <span className="inline-flex py-2.5 px-4 bg-secondary text-ternary rounded-full cursor-pointer hover:bg-accent hover:text-secondary transition duration-300 ease-linear">
            Non confirmé
          </span>
        </div>
      </div>
      {/* CLIENTS CONTAINER */}
      <div className="mt-8">
        <div className="text-sm flex items-center ">
          <span className="inline-flex items-center gap-1.5 bg-secondary text-ternary py-2.5 px-4 w-1/4 rounded-tl-full rounded-bl-full">
            <User size={16} />
            NOM COMPLET
          </span>
          <span className="inline-flex items-center gap-1.5 bg-secondary text-ternary py-2.5 px-4 w-1/4">
            <Phone size={16} />
            TELEPHONE
          </span>
          <span className="inline-flex items-center gap-1.5 bg-secondary text-ternary py-2.5 px-4 w-1/4">
            <Mail size={16} />
            EMAIL
          </span>
          <span className="inline-flex items-center gap-1.5 bg-secondary text-ternary py-2.5 px-4 w-1/4 rounded-tr-full rounded-br-full">
            <IdCard size={16} />
            N° PERMIS
          </span>
        </div>
      </div>
    </div>
  );
}

export default Clients;
