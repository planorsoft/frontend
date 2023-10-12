import { ColumnDef, SortingState } from "@tanstack/react-table";

class OData<T> {
    createSelectFromColumns(column : ColumnDef<T>[]) : string {
        // create odata select string from column
        let select = "";

        column.forEach((col, index) => {
            if (index === 0) {
                select += col.accessorKey;
            } else {
                select += "," + col.accessorKey;
            }
        });

        return select;
    }
    createSortFromSortingState(sortingState : SortingState) : string {
        // create odata sort string from sorting state
        let sort = "";

        sortingState.forEach((sortState, index) => {
            if (index === 0) {
                sort = `${sortState.id} ${sortState.desc ? "desc" : "asc"}`
            } else {
                sort = `${sort},${sortState.id} ${sortState.desc ? "desc" : "asc"}`
            }
        });

        return sort;
    }
}


export default OData;