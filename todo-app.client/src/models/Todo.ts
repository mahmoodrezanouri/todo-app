interface Todo {
    id: number;
    description: string;
    dueDate?: Date | null;
    done: boolean; 
    deadline?: Date | null;
    overDue: boolean;
}

export default Todo;