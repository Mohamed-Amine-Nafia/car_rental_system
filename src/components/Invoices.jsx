import { useEffect, useState } from "react";

function Invoices({ language, translations }) {
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

  if (loading)
    return (
      <div>{translations?.loadingContracts || "Loading contracts..."}</div>
    );
  if (error)
    return (
      <div>
        {translations?.errorLabel || "Error"}: {error}
      </div>
    );
  return (
    <div className="dashboard-container p-5">
      <h2 className="uppercase text-xl font-medium">
        {translations?.contractList || "Contract list"}
      </h2>

      <div className="w-full grid grid-cols-5 mt-5 text-xs bg-secondary text-ternary rounded-full uppercase">
        <span className="py-2 px-4">{translations?.no || "No."}</span>
        <span className="py-2 px-4">
          {translations?.contractClient ||
            (language === "ar" ? "العميل" : "Client")}
        </span>
        <span className="py-2 px-4">
          {translations?.licenseNo || "LICENSE NO."}
        </span>
        <span className="py-2 px-4">
          {translations?.contractDate ||
            (language === "ar" ? "التاريخ" : "Date")}
        </span>
        <span className="py-2 px-4">
          {translations?.contractAction ||
            (language === "ar" ? "الإجراء" : "Action")}
        </span>
      </div>

      {contracts.map((contract, index) => (
        <div
          key={contract.id}
          className="w-full grid grid-cols-5 bg-primary border border-gray-100 rounded-full text-sm"
        >
          <span className="py-2 px-4">{index + 1}</span>
          <span className="py-2 px-4">{contract.client_name}</span>
          <span className="py-2 px-4">{contract.license}</span>
          <span className="py-2 px-4">{contract.created_at}</span>

          <button
            onClick={() => handleDownload(contract.id)}
            className="py-2 px-4 text-accent hover:text-secondary duration-200 ease-linear cursor-pointer"
          >
            {translations?.downloadPdf || "Download PDF"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Invoices;
