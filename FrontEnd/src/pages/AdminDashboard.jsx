import { useEffect, useState } from "react";
import { listUsers, deleteUser, setUserRole, getStats } from "../api/adminService";
import UserTable from "../components/UserTable";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);

  const load = async () => {
    const u = await listUsers();
    setUsers(u.data);
    const s = await getStats();
    setStats(s.data);
  };

  useEffect(() => {
    load();
  }, []);

  const onPromote = async (id) => {
    await setUserRole(id, "admin");
    await load();
  };

  const onDelete = async (id) => {
    await deleteUser(id);
    await load();
  };

  return (
    <>
      <div className="card">
        <h3>Stats</h3>
        {stats ? (
          <ul className="list">
            <li className="list-item"><strong>Total users:</strong> {stats.total_users}</li>
            <li className="list-item"><strong>Total transactions:</strong> {stats.total_transactions}</li>
            <li className="list-item"><strong>Total reports:</strong> {stats.total_reports}</li>
            <li className="list-item"><strong>Average score:</strong> {stats.average_score}</li>
          </ul>
        ) : (
          <p>Loading stats...</p>
        )}
      </div>
      <UserTable users={users} onDelete={onDelete} onPromote={onPromote} />
    </>
  );
}
