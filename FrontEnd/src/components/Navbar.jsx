import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <header className="navbar">
      <div className="brand">MyFinance</div>

      <nav className="nav-links">
        <Link to="/">Home</Link>

        {user && (
          <>
            <Link to="/transactions">Transactions</Link>
            <Link to="/scores">Scores</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/profile">Profile</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
          </>
        )}
      </nav>

      <div className="nav-actions">
        {!user ? (
          <>
            <Link className="btn" to="/login">Login</Link>
            <Link className="btn outline" to="/register">Register</Link>
          </>
        ) : (
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
