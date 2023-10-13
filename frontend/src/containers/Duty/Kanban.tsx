import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { Duty, DutyCategory, DutyState } from "./types";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateDutyOrders } from "./actions";

const mapDuties = (duties: Duty[], categories: DutyCategory[]) => {
  const result = {}
  categories.forEach(category => {
    result[category.id] = {
      id: category.id,
      name: category.title,
      duties: duties.filter(duty => duty.categoryId === category.id)
    }
  })
  return result;
};

const mapColumns = (columns : object) => {
  const col = Object.values(columns);
  const result = [];
  let sum = 0;
  col.forEach((column, i) => {
    column.duties.forEach((duty, j) => {
      sum += 1;
      result.push({id: duty.id, order: sum, categoryId: column.id})
    })
  });
  return result;
}


function App() {
  const dutyState = useAppSelector<DutyState>(state => state.dutyState);
  const duties = dutyState.duties;
  const dutyCategories = dutyState.dutyCategories;
  const [columns, setColumns] = useState(mapDuties(duties, dutyCategories));
  const dispatch = useAppDispatch();

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
          duties: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          duties: destItems
        }
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
          duties: copiedItems
        }
      };
      dispatch(updateDutyOrders(mapColumns(col)));
      setColumns(col);
    }
  };

  return (
    <div className="flex justify-between w-full gap-4 overflow-y-auto min-h-screen">
      <DragDropContext
        onDragEnd={result => onDragEnd(result)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              className="flex flex-col border rounded p-4 duties-center"
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="p-4"
                        style={{ width: 250, minHeight: 500 }}
                      >
                        {column.duties.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id.toString()}
                              draggableId={item.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-slate-700 my-2 p-4 rounded "
                                    style={{
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.title}
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
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;



/*

            className="flex flex-col border rounded p-4 col-span-4"
            
            
 */