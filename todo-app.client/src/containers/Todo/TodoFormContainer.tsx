import React, { useState } from 'react';
import TodoForm from '../../components/Todo/TodoForm';
import TodoTaskService from '../../services/TodoTaskService';
import useAsync from '../../hooks/useAsync';
import Todo from '../../models/Todo';


interface TodoFormContainerProps {
    onFormSubmit: () => void;
}

const TodoFormContainer: React.FC<TodoFormContainerProps> = ({ onFormSubmit }) => {

    const { execute} = useAsync(TodoTaskService.addTask);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleCreateTodoTask = async (todo: Todo) => {

        try {
            await execute(todo);
            onFormSubmit();
            setErrorMessage(null);

        }catch(error){
            setErrorMessage(error.message);
        }
           
   
    };


    return <TodoForm onSubmit={handleCreateTodoTask} error={errorMessage} />;
};

export default TodoFormContainer;