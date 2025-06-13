import { User } from "./user";

export interface Project {
    id: number;
    title: string;
    description : string;
    price: number;
    type: string;
    status: string;
    due_date: string;
    assigned_to: number | null;
    assignee: User;
    creator: User;
}