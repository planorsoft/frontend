import ProjectSummary from "@/containers/Reports/components/ProjectSummary";
import StickyNotes from "../Reports/components/StickyNotes";
import EventSummary from "../Reports/components/EventSummary";
import ToDoSummary from "../Reports/components/ToDoSummary";
import InProgressSummary from "../Reports/components/InProgressSummary";
import FinanceChart from "../Reports/components/FinanceChart";
import CustomerSummary from "../Reports/components/CustomerSummary";
import LeadSummary from "../Reports/components/LeadSummary";

const Dashboard = () => {
  return (
    <div className="px-4 py-8 sm:px-10 md:px-20 mx-auto relative">
      <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-12 gap-4 sm:gap-6">
        <div className="col-span-1 sm:col-span-3 md:col-span-6">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <ProjectSummary />
          </div>
        </div>
        <div className="col-span-1 sm:col-span-3 md:col-span-6">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <EventSummary />
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-4">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <ToDoSummary />
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-4">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <InProgressSummary />
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-4">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <ProjectSummary />
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-6">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <CustomerSummary />
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-6">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <LeadSummary />
          </div>
        </div>
        
        <div className="col-span-1 sm:col-span-4 md:col-span-8">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <FinanceChart/>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-4">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <StickyNotes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
