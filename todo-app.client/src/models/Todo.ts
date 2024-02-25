interface Todo {
    id: number;
    description: string;
    dueDate?: Date | null;
    done: boolean; 
    deadline?: Date | null;
}

export default Todo;