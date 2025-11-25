import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="logo">MyFinance</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/transactions">Transactions</Link></li>
            <li><Link to="/scores">Scores</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            {user.role === "admin" && <li><Link to="/admin">Admin</Link></li>}
            <li><button className="btn danger" onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
