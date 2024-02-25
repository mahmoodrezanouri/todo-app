import React from 'react';
import TodoForm from '../../components/Todo/TodoForm';
import TodoTaskService from '../../services/TodoTaskService';
interface Todo {
    id: number;
    description: string;
    // Add other properties as needed
}

interface TodoFormContainerProps {
    onFormSubmit: () => void; // Callback function to trigger refresh
}

const TodoFormContainer: React.FC<TodoFormContainerProps> = ({ onFormSubmit }) => {
    const handleCreateTodoTask = async (todo: Todo) => {
        try {
            // Assuming TodoTaskService.createTodoTask accepts a Todo object
            await TodoTaskService.addTask(todo);

            onFormSubmit();

        } catch (error) {
            console.error('Error creating TodoTask:', error.message);
            // Handle error if needed
        }
    };

    return <TodoForm onSubmit={handleCreateTodoTask} />;
};

export default TodoFormContainer;