import "../styles/scores.css";

export default function ScoreCard({ score }) {
  const colorClass = score.couleur;
  return (
    <div className={`card score ${colorClass}`}>
      <h3>Score: {score.valeur}</h3>
      <p>Date: {new Date(score.date_calcul).toLocaleString()}</p>
    </div>
  );
}
