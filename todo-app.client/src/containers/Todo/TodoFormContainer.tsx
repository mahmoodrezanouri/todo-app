import React from 'react';
import TodoForm from '../../components/Todo/TodoForm';
import TodoTaskService from '../../services/TodoTaskService';
import Todo from '../../models/Todo';


interface TodoFormContainerProps {
    onFormSubmit: () => void; 
}

const TodoFormContainer: React.FC<TodoFormContainerProps> = ({ onFormSubmit }) => {
    const handleCreateTodoTask = async (todo: Todo) => {
        try {
         
            await TodoTaskService.addTask(todo);
            onFormSubmit();

        } catch (error) {
            console.error('Error creating TodoTask:', error.message);
        }
    };

    return <TodoForm onSubmit={handleCreateTodoTask} />;
};

export default TodoFormContainer;