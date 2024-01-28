import ProjectSummary from "@/containers/Reports/components/ProjectSummary";

const Dashboard = () => {
  return (
    <div className="px-2 py-4 md:px-20 mx-auto">
      <div className="grid grid-cols-12">
        <div className="col-span-6">
          <ProjectSummary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
