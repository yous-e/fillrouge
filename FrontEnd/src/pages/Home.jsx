import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="card">
      <h2>Bienvenue sur MyFinance</h2>
      <p>
        Gérez vos finances personnelles facilement : ajoutez vos transactions, consultez vos scores,
        générez des rapports et suivez vos progrès.
      </p>

      {!user ? (
        <div className="actions">
          <Link to="/login" className="btn">Se connecter</Link>
          <Link to="/register" className="btn">Créer un compte</Link>
        </div>
      ) : (
        <div className="actions">
          <Link to="/profile" className="btn">Mon Profil</Link>
          <Link to="/transactions" className="btn">Mes Transactions</Link>
          <Link to="/scores" className="btn">Mes Scores</Link>
          <Link to="/reports" className="btn">Mes Rapports</Link>
          {user.role === "admin" && (
            <Link to="/admin" className="btn">Admin Dashboard</Link>
          )}
        </div>
      )}
    </section>
  );
}
