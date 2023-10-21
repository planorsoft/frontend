import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { Duty, DutyCategory, DutyCategoryState, DutyState } from "./types";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateDutyOrders } from "./actions";
import { Button } from "@/components/ui/button";
import { GripHorizontal, Pencil } from "lucide-react";
import { selectDutyByProjectId } from "./selector";
import { useTheme } from "@/components/theme-provider";

const mapDuties = (duties: Duty[], categories: DutyCategory[]) => {
  const result = {};
  categories.forEach((category) => {
    result[category.id] = {
      id: category.id,
      name: category.title,
      duties: duties.filter((duty) => duty.categoryId === category.id),
    };
  });
  return result;
};

const mapColumns = (columns: object) => {
  const col = Object.values(columns);
  const result = [];
  let sum = 0;
  col.forEach((column, i) => {
    column.duties.forEach((duty, j) => {
      sum += 1;
      result.push({ id: duty.id, order: sum, categoryId: column.id });
    });
  });
  return result;
};

interface KanbanProps extends React.HTMLAttributes<HTMLDivElement> {
  openUpsertDuty: (id: number) => void;
  openUpsertDutyCategory: (id: number) => void;
  projectId?: string;
}

function Kanban({ openUpsertDuty, openUpsertDutyCategory, projectId }: KanbanProps) {
  const dutyState = useAppSelector<DutyState>((state) => state.dutyState);
  const duties = selectDutyByProjectId(dutyState, projectId);
  const dutyCategoryState = useAppSelector<DutyCategoryState>(
    (state) => state.dutyCategoryState
  );
  const dutyCategories = dutyCategoryState.dutyCategories;
  const [columns, setColumns] = useState(mapDuties(duties, dutyCategories));
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.duties];
      const destItems = [...destColumn.duties];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const col = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          duties: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          duties: destItems,
        },
      };
      dispatch(updateDutyOrders(mapColumns(col)));
      setColumns(col);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.duties];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const col = {
        ...columns,
        [source.droppableId]: {
          ...column,
          duties: copiedItems,
        },
      };
      dispatch(updateDutyOrders(mapColumns(col)));
      setColumns(col);
    }
  };

  return (
    <>
      <div className="flex justify-between w-full gap-4 overflow-y-auto min-h-screen">
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                className="flex flex-col border rounded p-4 duties-center"
                key={columnId}
              >
                <div className="flex justify-between items-center group h-10">
                  <h2>{column.name}</h2>
                    <div className="w-10 h-10 flex items-center justify-center">
                      <GripHorizontal className="w-4 h-4 block group-hover:hidden" />
                    </div>
                    <Button
                      className="hidden group-hover:flex"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        openUpsertDutyCategory(columnId);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                </div>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ width: 250, minHeight: 500 }}
                      >
                        {column.duties.map((item, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={item.id?.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                let backgroundColor = "";
                                if (snapshot.isDragging) {
                                  backgroundColor = theme == "dark" ? "#27272a" : "#f1f5f9";
                                } else {
                                  backgroundColor = theme == "dark" ? "#090b0f" : "#ffffff";
                                }
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="my-2 p-2 border w-full rounded flex justify-between items-center"
                                    style={{
                                      minHeight: "50px",
                                      backgroundColor: backgroundColor,
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.title}
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() => {
                                        openUpsertDuty(item.id);
                                      }}
                                    >
                                      <Pencil className="w-4 h-4" />
                                    </Button>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default Kanban;
