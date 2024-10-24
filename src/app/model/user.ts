export interface User {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
}

export interface UserPage {
    content: User[];
}
