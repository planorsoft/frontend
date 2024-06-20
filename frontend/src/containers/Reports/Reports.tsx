import ProjectSummary from "@/containers/Reports/components/ProjectSummary";
import CustomerSummary from "@/containers/Reports/components/CustomerSummary";
import FinanceSummary from "@/containers/Reports/components/FinanceSummary";
import DutySummary from "./components/DutySummary";

const Reports = () => {
  return (
    <div className="px-4 py-8 sm:px-10 md:px-20 mx-auto relative">
      <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-12 gap-4 sm:gap-6">
        <div className="col-span-12 md:col-span-6">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <ProjectSummary />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <CustomerSummary />
          </div>
        </div>
        <div className="col-span-12">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <FinanceSummary />
          </div>
        </div>
        <div className="col-span-12">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <DutySummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
