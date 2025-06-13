import { User } from "./user";

export interface Project {
    id: number;
    title: string;
    description : string;
    price: number;
    type: string;
    due_date: string;
    assignee: User;
}