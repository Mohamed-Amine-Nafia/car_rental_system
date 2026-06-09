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
    <div className="dashboard-container">
      <h2>Liste des Contrats</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.id}>
              <td>{contract.id}</td>
              <td>{contract.client_name}</td>
              <td>{contract.license}</td>
              <td>{contract.created_at}</td>
              <td>
                <button
                  onClick={() => handleDownload(contract.id)}
                  style={{ padding: "8px 16px", cursor: "pointer" }}
                >
                  Télécharger PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Invoices;
