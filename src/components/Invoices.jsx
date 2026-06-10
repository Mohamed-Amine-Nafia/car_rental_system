import { useEffect, useState } from "react";

function Invoices() {
  const [contracts, setContracts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await fetch(
          "http://localhost/car_rental/fetch-contracts.php",
        );
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error: ${errorText}`);
        }
        const data = await res.json();
        setContracts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.log(error);
      }
    };
    fetchContracts();
  }, []);

  const handleDownload = (id) => {
    // Trigger the PHP download script
    // Ensure the spelling matches your filename exactly
    window.location.href = `http://localhost/car_rental/download.php?id=${id}`;
  };

  if (loading) return <div>Chargement des contrats...</div>;
  if (error) return <div>Erreur : {error}</div>;
  return (
    <div className="dashboard-container p-5">
      <h2 className="uppercase text-xl font-medium">Liste des Contrats</h2>

      <div className="w-full grid grid-cols-5 mt-5 bg-secondary text-ternary rounded-full text-sm uppercase">
        <span className="py-2 px-4 ">N°</span>
        <span className="py-2 px-4">Client</span>
        <span className="py-2 px-4">N° PERMIS</span>
        <span className="py-2 px-4">Date</span>
        <span className="py-2 px-4">Action</span>
      </div>

      {contracts.map((contract) => (
        <div
          key={contract.id}
          className="w-full grid grid-cols-5 bg-primary border border-gray-100 rounded-full text-sm"
        >
          <span className="py-2 px-4">{contract.id}</span>
          <span className="py-2 px-4">{contract.client_name}</span>
          <span className="py-2 px-4">{contract.license}</span>
          <span className="py-2 px-4">{contract.created_at}</span>

          <button
            onClick={() => handleDownload(contract.id)}
            className="py-2 px-4 text-accent hover:text-secondary duration-200 ease-linear cursor-pointer"
          >
            Télécharger PDF
          </button>
        </div>
      ))}
    </div>
  );
}

export default Invoices;
