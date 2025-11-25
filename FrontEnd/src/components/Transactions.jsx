import { useEffect, useState } from "react";
import { getTransactionsApi } from "../api/axios"; // ton api.js corrigé

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getTransactionsApi();
        setTransactions(res.data); // directement un tableau
      } catch (err) {
        console.error("Erreur transactions:", err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Mes Transactions</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.montant} - {t.type} - {t.categorie}
          </li>
        ))}
      </ul>
    </div>
  );
}
