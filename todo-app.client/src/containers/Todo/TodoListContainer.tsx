import React, { useState, useEffect } from 'react';
import TodoGrid from '../../components/Todo/Grid/TodoGrid';
import TodoTaskService from '../../services/TodoTaskService';
import useAsync from '../../hooks/useAsync';
import Todo from '../../models/Todo';
import ServiceResponse from '../../models/ServiceResponse';


interface TodoListContainerProps {
    refreshTodos: boolean;
    setRefreshTodos: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoListContainer: React.FC<TodoListContainerProps> = ({ refreshTodos, setRefreshTodos }) => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const { loading, error, execute } = useAsync(TodoTaskService.getAllTasks);
    const { execute: executeDelete } = useAsync(TodoTaskService.removeTask);
    const { execute: executeMarkTaskAsDone } = useAsync(TodoTaskService.markTaskAsDone);
    const { execute: executeMarkTaskAsUnDone } = useAsync(TodoTaskService.markTaskAsUnDone);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handlePerRowsChange = (newPerPage: number) => {
        setPageSize(newPerPage);
    };
    const handleDeleteItem = async (id: number) => {

        await executeDelete(id) as ServiceResponse<any>;
        getTodos();
    };

    const handleMarkTaskAsDone = async (id: number) => {

        await executeMarkTaskAsDone(id) as ServiceResponse<any>;
        getTodos();
    };

    const handleMarkTaskAsUnDone = async (id: number) => {

        await executeMarkTaskAsUnDone(id) as ServiceResponse<any>;
        getTodos();
    };

    const getTodos = async () => {

        const response = await execute(currentPage, pageSize) as ServiceResponse<Todo[]>;

        if (response.error == null) {

            const data = response.data as Todo[];
            setTodos(data);
            setTotalPages(0);
        }
   
    };

    useEffect(() => {

        if (refreshTodos) {
            getTodos();
            setRefreshTodos(false);
        }

    }, [currentPage, pageSize, refreshTodos]);

    return (

        <TodoGrid
            todos={todos}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onPerRowsChange={handlePerRowsChange}
            loading={loading}
            error={error}
            onDelete={handleDeleteItem}
            markTaskAsDone={handleMarkTaskAsDone}
            markTaskAsUnDone={handleMarkTaskAsUnDone}
        />
    );

};

export default TodoListContainer;

