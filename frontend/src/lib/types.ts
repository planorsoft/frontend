export interface Pagination {
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface PaginatedList<T> extends Pagination {
    items: T[];
}

export interface SelectList {
    value: string;
    label: string;
}