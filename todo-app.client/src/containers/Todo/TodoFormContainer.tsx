import React, { useState } from 'react';
import TodoForm from '../../components/Todo/Form/TodoForm';
import TodoTaskService from '../../services/TodoTaskService';
import useAsync from '../../hooks/useAsync';
import Todo from '../../models/Todo';
import ServiceResponse from '../../models/ServiceResponse';



interface TodoFormContainerProps {
    onFormSubmit: () => void;
}

const TodoFormContainer: React.FC<TodoFormContainerProps> = ({ onFormSubmit }) => {

    const { execute} = useAsync(TodoTaskService.addTask);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleCreateTodoTask = async (todo: Todo) => {

        const response = await execute(todo) as ServiceResponse<Todo>;
        setErrorMessage(response.error?.message);
        onFormSubmit();
   
    };


    return <TodoForm onSubmit={handleCreateTodoTask} error={errorMessage} />;
};

export default TodoFormContainer;