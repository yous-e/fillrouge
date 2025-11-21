export default function UserTable({ users, onDelete, onPromote }) {
  return (
    <div className="card">
      <h3>Users</h3>
      <table className="table">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="actions">
                <button className="btn outline" onClick={() => onPromote(u.id)}>Make admin</button>
                <button className="btn danger" onClick={() => onDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
