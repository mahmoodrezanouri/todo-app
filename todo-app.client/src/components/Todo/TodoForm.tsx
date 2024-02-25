// TodoForm.tsx
import React, { useState } from 'react';

interface Todo {
    id: number;
    description: string;
    // Add other properties as needed
}

interface TodoFormProps {
    onSubmit: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
    const [todo, setTodo] = useState<Todo>({ id: 0, description: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (todo.description.trim()) {
            onSubmit(todo);
            setTodo({ id: 0, description: '' }); // Reset the form
        } else {
            alert('Please enter a description.');
        }
    };

    return (
        <div>
            <h2>Create a new TodoTask</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Description:
                    <input
                        type="text"
                        value={todo.description}
                        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                    />
                </label>
                {/* Add input fields for other properties if needed */}
                <button type="submit">Create TodoTask</button>
            </form>
        </div>
    );
};

export default TodoForm;
