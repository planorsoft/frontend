export interface Project {
    id?: number;
    title: string;
    isCompleted: boolean;
    customerId: number;
    description: string | null;
    price: number;
}