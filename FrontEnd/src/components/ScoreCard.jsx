export default function ScoreCard({ score }) {
  return (
    <div className="card">
      <h3>Current Score</h3>
      <p>
        <strong>Value:</strong> {score.valeur}{" "}
        <span className={`badge ${score.couleur}`}>{score.couleur}</span>
      </p>
      <p><strong>Date:</strong> {score.date_calcul}</p>
    </div>
  );
}
