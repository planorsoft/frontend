import { useEffect, useState } from "react";
import { getFinancesSummary } from "../service";
import { Landmark, Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FinanceSummary = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [financeSummary, setFinanceSummary] = useState({
    income: [],
    outcome: [],
  });

  useEffect(() => {
    getFinancesSummary()
      .then((response) => {
        setFinanceSummary(response?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: t("reports.finances.detail"),
      },
    },
  };

  const labels = financeSummary.income.map((income) => income.month);
  console.log({ labels, financeSummary });

  const data = {
    labels,
    datasets: [
      {
        label: t("reports.finances.income"),
        data: financeSummary.income.map((income) => income.amount),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: t("reports.finances.expense"),
        data: financeSummary.outcome.map((outcome) => outcome.amount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-xl font-medium">
          {t("reports.finances.title")}
        </h3>
        <Landmark className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-6 pt-0 h-[300px]">
        {loading ? (
          <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />
        ) : financeSummary.income.length <= 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-lg font-medium text-center text-muted-foreground">
              {t("reports.finances.noData")}
            </h3>
          </div>
        ) : (
          <Line options={options} data={data} />
        )}
      </div>
    </div>
  );
};

export default FinanceSummary;
