import { useEffect, useState } from "react";
import { exportReport, listReports, downloadReport } from "../api/reportService";
import ReportList from "../components/ReportList";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [range, setRange] = useState({ date_start: "", date_end: "" });

  const load = async () => {
    const { data } = await listReports();
    setReports(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleExport = async (e) => {
    e.preventDefault();
    await exportReport(range);
    await load();
  };

  const handleDownload = async (id) => {
    const { data } = await downloadReport(id);
    const blobUrl = window.URL.createObjectURL(new Blob([data]));
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `report_${id}.pdf`;
    a.click();
    window.URL.revokeObjectURL(blobUrl);
  };

  return (
    <>
      <form className="card form" onSubmit={handleExport}>
        <h3>Export report</h3>
        <div className="grid">
          <div>
            <label>Date start</label>
            <input
              type="date"
              value={range.date_start}
              onChange={(e) => setRange((r) => ({ ...r, date_start: e.target.value }))}
              required
            />
          </div>
          <div>
            <label>Date end</label>
            <input
              type="date"
              value={range.date_end}
              onChange={(e) => setRange((r) => ({ ...r, date_end: e.target.value }))}
              required
            />
          </div>
        </div>
        <button className="btn">Export</button>
      </form>
      <ReportList reports={reports} onDownload={handleDownload} />
    </>
  );
}
