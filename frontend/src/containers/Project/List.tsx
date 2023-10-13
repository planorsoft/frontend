import DataTable from "@/components/data-table";
import { Project } from "@/containers/Project/types";
import { Plus } from "lucide-react";
import Upsert from "./Upsert";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useForceUpdate from "@/hooks/use-force-update";


const List = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const forceUpadte = useForceUpdate();

  const select = (id : number) => {
    setId(id);
    setOpen(true);
  }

  const openUpsert = () => {
    setId(0);
    setOpen(true);
  }


  return (
    <div>
      <div className="flex justify-between my-2">
        <h2 className="text-2xl font-semibold">Projeler</h2>
          <Button onClick={openUpsert}>
            <Plus size={16} /> Yeni Proje
          </Button>
      </div>
      <DataTable<Project> 
        url="/odata/projects" 
        entity="project" 
        select={select}
        />
      <Upsert 
        open={open} 
        setOpen={setOpen} 
        forceUpadte={forceUpadte} 
        projectId={id}
      />
    </div>
  );
};

export default List;
