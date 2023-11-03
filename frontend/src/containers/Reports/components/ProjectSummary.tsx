import { useEffect, useState } from "react";
import { getProjectsSummary } from "../service";

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
    <div className="w-full border p-2">
      <div className="text-lg font-bold">Projeler</div>
      <hr className="my-2" />
      <div className="flex justify-between gap-2">
        <div className="text-center">
            <p>Toplam</p>
            <p>{projectSummary.totalCount}</p>
        </div>
        <div className="text-center">
            <p>Tamamlanan</p>
            <p>{projectSummary.completedCount}</p>
        </div>
        <div className="text-center">
            <p>Aktif</p>
            <p>{projectSummary.activeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
