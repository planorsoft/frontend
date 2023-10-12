export interface Project {
    title: string;
    isOutsource: boolean;
    customerId: number;
    description: string | null;
    price: number;
}

export interface ProjectUpsert {
    id: number | null;
    title: string;
    isOutsource: boolean;
    customerId: number;
    description: string | null;
    price: number;
}

export interface ProjectDelete {
    id: string;
}
    