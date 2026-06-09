import { IdCard, Mail, Phone, Search, User } from "lucide-react";
import { useState, useEffect } from "react";

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(
          "http://localhost/car_rental/fetch-clients.php",
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          const errorText = response.text();
          throw new Error(`Error: ${errorText}`);
        }
        const data = await response.json();
        if (data.status === "error") {
          throw new Error(`Error : ${data.message}`);
        }
        setClients(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="relative h-screen w-full bg-primary  px-6 py-3">
      <h2 className="text-2xl text-secondary font-semibold mt-6  border-b border-ternary pb-2.5">
        CLIENTS
      </h2>
      <div className="flex items-center mt-6 gap-4  border-b border-ternary pb-6">
        <div className="flex items-center relative ">
          <input
            className="bg-ternary text-xs py-2 pl-3 pr-16 outline-0 rounded-full"
            type="text"
            placeholder="Rechercher"
          />
          <Search className="absolute top-1.5 right-3 " size={18} />
        </div>
        <div className="text-xs flex items-center gap-3">
          <span className="inline-flex py-2 px-4 bg-secondary text-ternary rounded-full cursor-pointer hover:bg-accent hover:text-secondary transition duration-300 ease-linear">
            Confirmé
          </span>
          <span className="inline-flex py-2 px-4 bg-secondary text-ternary rounded-full cursor-pointer hover:bg-accent hover:text-secondary transition duration-300 ease-linear">
            Non confirmé
          </span>
        </div>
      </div>
      {/* CLIENTS CONTAINER */}
      <div className="mt-8">
        <div className="text-xs grid grid-cols-4  ">
          <span className="inline-flex items-center gap-1.5 bg-secondary text-ternary py-2 pl-4 rounded-tl-full rounded-bl-full">
            N°
          </span>
          <span className="inline-flex items-center gap-1.5 bg-secondary text-ternary py-2  pl-4">
            <User size={16} />
            NOM COMPLET
          </span>
          <span className="inline-flex items-center gap-1.5 bg-secondary text-ternary py-2 pl-4">
            <Phone size={16} />
            TELEPHONE
          </span>
          <span className="inline-flex items-center gap-1.5 bg-secondary text-ternary py-2 pl-4 rounded-tr-full rounded-br-full">
            <IdCard size={16} />
            N° PERMIS
          </span>
        </div>
        <div>
          {clients.map((client, index) => {
            return (
              <div
                key={client.client_id}
                className="grid grid-cols-4 text-sm bg-primary rounded-full border border-gray-100"
              >
                <span className="pl-4 py-2">{index + 1}</span>
                <span className="pl-4 py-2">{client.full_name}</span>
                <span className="pl-4 py-2">{client.phone}</span>
                <span className="pl-4 py-2">{client.license_number}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Clients;
