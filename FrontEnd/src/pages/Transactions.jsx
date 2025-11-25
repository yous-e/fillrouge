import { useEffect, useState } from "react";
import { listTransactions, createTransaction, deleteTransaction } from "../api/transactionService";
import TransactionForm from "../components/TransactionForm";

export default function Transactions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const { data } = await listTransactions();
      // ✅ backend يرجع مصفوفة مباشرة أو داخل data
      setItems(Array.isArray(data) ? data : data.data);
    } catch (err) {
      console.error("Erreur chargement transactions:", err);
      setError("Impossible de charger les transactions.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (payload) => {
    setLoading(true);
    try {
      await createTransaction(payload);
      await load();
    } catch (err) {
      console.error("Erreur ajout transaction:", err);
      setError("Ajout échoué.");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      await deleteTransaction(id);
      await load();
    } catch (err) {
      console.error("Erreur suppression transaction:", err);
      setError("Suppression échouée.");
    }
  };

  return (
    <>
      <TransactionForm onSubmit={add} loading={loading} />
      <div className="card">
        <h3>Vos transactions</h3>
        {error && <div className="alert">{error}</div>}
        <ul className="list">
          {items.map((t) => (
            <li key={t.id} className="list-item">
              <div>
                <strong>{t.type}</strong> — {t.categorie} — {t.montant}
              </div>
              <button className="btn danger" onClick={() => remove(t.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
