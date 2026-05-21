import { IdCard, Mail, Phone, Search, User } from "lucide-react";

function Clients() {
  return (
    <div className="relative h-screen w-full bg-primary  p-6">
      <h2 className="text-2xl text-secondary font-semibold mt-6  border-b border-ternary pb-2.5">
        CLIENTS
      </h2>
      <div className="flex items-center mt-12 gap-4  border-b border-ternary pb-2.5">
        <div className="flex items-center relative ">
          <input
            className="bg-ternary text-xs py-2 pl-3 pr-16 outline-0 rounded-md"
            type="text"
            placeholder="Rechercher"
          />
          <Search className="absolute top-1.5 right-1.5 " size={18} />
        </div>
        <div className="text-xs flex items-center gap-3">
          <span className="inline-flex py-2 px-4 bg-secondary text-ternary rounded-md cursor-pointer hover:bg-accent hover:text-secondary transition duration-300 ease-linear">
            Confirmé
          </span>
          <span className="inline-flex py-2 px-4 bg-secondary text-ternary rounded-md cursor-pointer hover:bg-accent hover:text-secondary transition duration-300 ease-linear">
            Non confirmé
          </span>
        </div>
      </div>
      {/* CLIENTS CONTAINER */}
      <div className="mt-8">
        <div className="text-sm flex items-center ">
          <span className="inline-flex items-center gap-1.5 bg-secondary text-ternary py-2 px-4 w-1/4 rounded-tl-md rounded-bl-md">
            <User size={16} />
            NOM COMPLET
          </span>
          <span className="inline-flex items-center gap-1.5 bg-secondary text-ternary py-2 px-4 w-1/4">
            <Phone size={16} />
            TELEPHONE
          </span>
          <span className="inline-flex items-center gap-1.5 bg-secondary text-ternary py-2 px-4 w-1/4">
            <Mail size={16} />
            EMAIL
          </span>
          <span className="inline-flex items-center gap-1.5 bg-secondary text-ternary py-2 px-4 w-1/4 rounded-tr-md rounded-br-md">
            <IdCard size={16} />
            N° PERMIS
          </span>
        </div>
      </div>
    </div>
  );
}

export default Clients;
