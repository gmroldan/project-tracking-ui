export interface Task {
    id?: number;
    title: string;
    description: string;
    storyPoints: number;
    priority: string;
    status: string;
    userIdAssigned: number | null;
}