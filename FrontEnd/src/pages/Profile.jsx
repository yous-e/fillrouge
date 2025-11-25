import { useEffect, useState } from "react";
import { getProfile } from "../api/authService";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        console.log("Profile data:", data);

        // ✅ backend يرجع كائن المستخدم مباشرة (id, name, email, role)
        setUser(data);
      } catch (err) {
        setError(
          "Impossible de charger le profil. Vérifie ton token ou reconnecte-toi. : " +
            err.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="loader">Chargement...</div>;
  if (error) return <div className="alert">{error}</div>;

  return (
    <section className="card">
      <h2>Mon Profil</h2>
      {user ? (
        <>
          <p><strong>ID :</strong> {user.id}</p>
          <p><strong>Nom :</strong> {user.name}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Rôle :</strong> {user.role}</p>
        </>
      ) : (
        <p>Aucun utilisateur connecté.</p>
      )}
    </section>
  );
}
