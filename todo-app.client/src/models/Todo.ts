interface Todo {
    id: number;
    description: string;
    createDate: Date | null;
    done: boolean; 
    deadline?: Date | null;
    overDue: boolean;
}

export default Todo;