import DataTable from "@/components/data-table";
import { Project } from "@/containers/Project/types";
import { Plus } from "lucide-react";
import Upsert from "./Upsert";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useTitle from "@/hooks/use-title";


const List = () => {
  useTitle("Projeler");
  const { customerId } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const filter = customerId && `CustomerId eq ${customerId}`;

  const select = (id : number) => {
    setId(id);
    setOpen(true);
  }

  const openUpsert = () => {
    setId(0);
    setOpen(true);
  }


  return (
    <div className="px-2 py-4 md:px-20 mx-auto">
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
        filter={filter}
        />
      <Upsert 
        open={open} 
        setOpen={setOpen} 
        projectId={id}
        customerId={customerId}
      />
    </div>
  );
};

export default List;
