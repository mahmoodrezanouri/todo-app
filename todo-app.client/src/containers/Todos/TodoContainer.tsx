import React, { useState, useEffect } from 'react';
import TodoGrid from '../../components/Todo/TodoGrid';
import TodoTaskService from '../../services/TodoTaskService';
import useAsync from '../../hooks/useAsync';


interface Todo {
    id: number;
    description: string;
}

const TodoContainer: React.FC = () => {

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

        getTodos();

    }, [currentPage, pageSize]);

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

export default TodoContainer;

