export interface User{
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;

    roles: {
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
    }[];
   permissions: Permission[];
}

export interface Permission {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}