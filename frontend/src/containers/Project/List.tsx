import DataTable from "@/components/data-table";
import { Project } from "@/containers/Project/types";

const List = () => {

  return (
    <DataTable<Project>
      url="/odata/projects"
      entity="project"
    />
  )
}

export default List