import { useEffect, useState } from "react";
import { listScores } from "../api/scoreService";
import ScoreCard from "../components/ScoreCard";

export default function Scores() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await listScores();
      // ✅ backend يرجع مصفوفة من النقاط
      setScores(Array.isArray(data) ? data : data.data);
    } catch (err) {
      console.error("Erreur chargement scores:", err);
      setError("Impossible de charger les scores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="loader">Chargement...</div>;
  if (error) return <div className="alert">{error}</div>;

  return (
    <section>
      <h2>Mes Scores</h2>
      {scores.length === 0 ? (
        <p>Aucun score disponible.</p>
      ) : (
        <div className="grid">
          {scores.map((s) => (
            <ScoreCard key={s.id} score={s} />
          ))}
        </div>
      )}
    </section>
  );
}
