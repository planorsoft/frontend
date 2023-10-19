export interface Project {
    id?: number;
    title: string;
    isOutsource: boolean;
    customerId: number;
    description: string | null;
    price: number;
}