import { useEffect, useState } from "react";
import { listReports, downloadReport } from "../api/reportService";
import ReportList from "../components/ReportList";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await listReports();
      // ✅ backend يرجع مصفوفة من التقارير
      setReports(Array.isArray(data) ? data : data.data);
    } catch (err) {
      console.error("Erreur chargement reports:", err);
      setError("Impossible de charger les rapports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDownload = async (id) => {
    try {
      const response = await downloadReport(id);
      // ✅ backend يرجع ملف PDF (Blob)
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur téléchargement report:", err);
      setError("Téléchargement échoué.");
    }
  };

  if (loading) return <div className="loader">Chargement...</div>;
  if (error) return <div className="alert">{error}</div>;

  return (
    <section>
      <h2>Mes Rapports</h2>
      {reports.length === 0 ? (
        <p>Aucun rapport disponible.</p>
      ) : (
        <ReportList reports={reports} onDownload={handleDownload} />
      )}
    </section>
  );
}
