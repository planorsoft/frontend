import { useEffect, useState } from "react";
import { getDutiesSummary } from "../service";
import { KanbanSquare, Loader } from "lucide-react";
import { useTranslation } from "react-i18next";

const DutySummary = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [dutySummary, setDutySummary] = useState({
    totalCount: 0,
    detail: "",
  });

  useEffect(() => {
    getDutiesSummary()
      .then((response) => {
        setDutySummary(response?.data);
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
        <h3 className="tracking-tight text-xl font-medium">
          {t("reports.duties.title")}
        </h3>
        <KanbanSquare className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-6 pt-0">
        {loading ? (
          <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />
        ) : (
          <>
            <div className="text-2xl font-bold">
              {dutySummary?.totalCount} {t("reports.duties.duty")}
            </div>
            <p className="text-muted-foreground mt-3">{dutySummary?.detail}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DutySummary;
