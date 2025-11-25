import { useEffect, useState } from "react";
import { getStats, listUsers, deleteUser, promoteUser } from "../api/adminService";
import UserTable from "../components/UserTable";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([getStats(), listUsers()]);
      setStats(statsRes.data);
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : usersRes.data.data);
    } catch (err) {
      console.error("Erreur chargement admin:", err);
      setError("Impossible de charger le tableau de bord.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      await load();
    } catch (err) {
      console.error("Erreur suppression utilisateur:", err);
      setError("Suppression échouée.");
    }
  };

  const handlePromote = async (id) => {
    try {
      await promoteUser(id);
      await load();
    } catch (err) {
      console.error("Erreur promotion utilisateur:", err);
      setError("Promotion échouée.");
    }
  };

  if (loading) return <div className="loader">Chargement...</div>;
  if (error) return <div className="alert">{error}</div>;

  return (
    <section>
      <h2>Admin Dashboard</h2>
      {stats && (
        <div className="card stats">
          <p><strong>Utilisateurs :</strong> {stats.users_count}</p>
          <p><strong>Transactions :</strong> {stats.transactions_count}</p>
          <p><strong>Rapports :</strong> {stats.reports_count}</p>
          <p><strong>Score moyen :</strong> {stats.average_score}</p>
        </div>
      )}
      <UserTable users={users} onDelete={handleDelete} onPromote={handlePromote} />
    </section>
  );
}
