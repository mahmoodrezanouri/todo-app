import React, { useState, useEffect } from 'react';
import TodoGrid from '../../components/Todo/TodoGrid';
import TodoTaskService from '../../services/TodoTaskService';
import useAsync from '../../hooks/useAsync';
import Todo from '../../models/Todo';


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

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handlePerRowsChange = (newPerPage: number) => {
        setPageSize(newPerPage);
    };

    const getTodos = async () => {

        const result = await execute(currentPage, pageSize);

        setTodos(result);
        setTotalPages(0);

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
        />
    );

};

export default TodoListContainer;

