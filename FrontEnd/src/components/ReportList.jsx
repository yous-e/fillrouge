export default function ReportList({ reports, onDownload }) {
  return (
    <div className="card">
      <h3>Reports</h3>
      <ul className="list">
        {reports.map((r) => (
          <li key={r.id} className="list-item">
            <span>{r.fichier_pdf}</span>
            <button className="btn outline" onClick={() => onDownload(r.id)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
