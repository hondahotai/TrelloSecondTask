export type TaskData = {
    isOpen: number,
    taskByColumn: {
        [columnId: number]: Task[];
    },
}

export type Task = {
    id: number;
    title: string;
    description: string;
    comments: string[];
    commentsCount: number;
}