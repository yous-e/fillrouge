import { useEffect, useState } from "react";
import { listTransactions, createTransaction, deleteTransaction } from "../api/transactionService";
import TransactionForm from "../components/TransactionForm";

export default function Transactions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await listTransactions();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (payload) => {
    setLoading(true);
    try {
      await createTransaction(payload);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    await deleteTransaction(id);
    await load();
  };

  return (
    <>
      <TransactionForm onSubmit={add} loading={loading} />
      <div className="card">
        <h3>Your transactions</h3>
        <ul className="list">
          {items.map((t) => (
            <li key={t.id} className="list-item">
              <div>
                <strong>{t.type}</strong> — {t.categorie} — {t.montant}
              </div>
              <button className="btn danger" onClick={() => remove(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
