import { useEffect, useState } from "react";
import { getScore, getScoreHistory } from "../api/scoreService";
import ScoreCard from "../components/ScoreCard";

export default function Scores() {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const load = async () => {
      const s = await getScore();
      setCurrent(s.data);
      const h = await getScoreHistory();
      setHistory(h.data);
    };
    load();
  }, []);

  return (
    <>
      {current && <ScoreCard score={current} />}
      <div className="card">
        <h3>Score history</h3>
        <ul className="list">
          {history.map((s, idx) => (
            <li key={idx} className="list-item">
              <span>{s.valeur}</span>
              <span className={`badge ${s.couleur}`}>{s.couleur}</span>
              <span>{s.date_calcul}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
