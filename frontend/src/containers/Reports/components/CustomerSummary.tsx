import { useEffect, useState } from "react";
import { getCustomersSummary } from "../service";
import { Loader, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const CustomerSummary = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [customerSummary, setCustomerSummary] = useState({
    potentialCount: 0,
    totalCount: 0,
  });

  useEffect(() => {
    getCustomersSummary()
      .then((response) => {
        setCustomerSummary(response?.data);
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
        <h3 className="tracking-tight text-xl font-medium">{t("reports.customers.title")}</h3>
        <Users className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-6 pt-0">
        {loading ? (
          <Loader className="w-8 h-8 animate-spin mx-auto mt-10" />
        ) : (
          <>
            <div className="text-2xl font-bold">{customerSummary?.totalCount} {t("reports.customers.customer")}</div>
            <p className="text-muted-foreground mt-3">
              {customerSummary?.potentialCount} {t("reports.customers.potantial")}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerSummary;
