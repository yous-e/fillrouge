import { useState } from "react";

export default function TransactionForm({ onSubmit, loading }) {
  const [form, setForm] = useState({ type: "", categorie: "", montant: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ type: "", categorie: "", montant: "" });
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h3>Add transaction</h3>
      <label>Type</label>
      <input name="type" value={form.type} onChange={handleChange} required />
      <label>Category</label>
      <input name="categorie" value={form.categorie} onChange={handleChange} required />
      <label>Amount</label>
      <input name="montant" type="number" value={form.montant} onChange={handleChange} required />
      <button className="btn" disabled={loading}>
        {loading ? "Saving..." : "Add"}
      </button>
    </form>
  );
}
