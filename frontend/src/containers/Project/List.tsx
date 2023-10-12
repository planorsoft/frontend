import DataTable from "@/components/data-table";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Project } from "@/containers/Project/types";
import { Plus } from "lucide-react";
import Upsert from "./Upsert";
import { Button } from "@/components/ui/button";


const List = () => {

  return (
  <div>
        <div className="flex justify-between my-2">
          <h2 className="text-2xl font-semibold">Projeler</h2>
          <Sheet>
            <SheetTrigger>
              <Button>
                <Plus size={16} /> Yeni Proje
              </Button>
            </SheetTrigger>
            <Upsert />
          </Sheet>
        </div>
        <DataTable<Project>
          url="/odata/projects"
          entity="project"
        />
    </div>
  )
}

export default List