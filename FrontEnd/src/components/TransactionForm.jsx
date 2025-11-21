import { useState } from "react";
import "../styles/transactions.css";

export default function TransactionForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    type: "depense",
    montant: "",
    date: "",
    categorie: "",
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="grid">
        <div>
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="depense">Depense</option>
            <option value="revenu">Revenu</option>
            <option value="dette">Dette</option>
          </select>
        </div>
        <div>
          <label>Montant</label>
          <input type="number" name="montant" value={form.montant} onChange={handleChange} required />
        </div>
        <div>
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Categorie</label>
          <input type="text" name="categorie" value={form.categorie} onChange={handleChange} />
        </div>
      </div>
      <button className="btn" disabled={loading}>{loading ? "Saving..." : "Add transaction"}</button>
    </form>
  );
}
