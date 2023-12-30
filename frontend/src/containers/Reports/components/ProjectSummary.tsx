import { useEffect, useState } from "react";
import { getProjectsSummary } from "../service";
import { Folder, Loader } from "lucide-react";

const ProjectSummary = () => {
  const [loading, setLoading] = useState(true);
  const [projectSummary, setProjectSummary] = useState({
    activeCount: 0,
    completedCount: 0,
    totalCount: 0,
  });

  useEffect(() => {
    getProjectsSummary()
      .then((response) => {
        setProjectSummary(response?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-xl font-medium">Projeler</h3>
        <Folder className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-6 pt-0">
        {loading ? (
          <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />
        ) : (
          <>
            <div className="text-2xl font-bold">Toplam {projectSummary.totalCount} proje</div>
            <p className="text-muted-foreground mt-3">
              {projectSummary.activeCount} aktif, {projectSummary.completedCount} tamamlanmış proje
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectSummary;
