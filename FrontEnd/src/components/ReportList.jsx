export default function ReportList({ reports, onDownload }) {
  return (
    <div className="card">
      <h3>Reports</h3>
      <ul className="list">
        {reports.map((r) => (
          <li key={r.id} className="list-item">
            <span>{r.date_start} → {r.date_end}</span>
            <button className="btn" onClick={() => onDownload(r.id)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
