import { FC } from 'react';
import DataGrid from 'react-data-table-component';
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import ErrorMessage from "../../components/Error/ErrorMessage";

interface TodoGridProps {
    todos: Todo[];
    totalPages: number;
    onPageChange: (page: number) => void;
    onPerRowsChange: (newPerPage: number, page: number) => void;
    loading: boolean;
    error: Error | null;
    currentPage: number;
}

interface Todo {
    id: number;
    description: string;
}

const TodoGrid: FC<TodoGridProps> = ({ todos , totalPages, onPageChange, onPerRowsChange, loading, error }) => {

    if (error) {
        return <ErrorMessage message = {error.message} />;
    }

    const columns = [
        {
            name: 'Id',
            selector: (row: Todo) => row.id,
        },
        {
            name: 'description',
            selector: (row: Todo) => row.description,
        }
    ];

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    const handlePerRowsChange = (newPerPage: number, page: number) => {
        onPerRowsChange(newPerPage, page);
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                columns={columns}
                data={todos}
                pagination
                paginationServer
                paginationTotalRows={totalPages}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                progressComponent={<LoadingSpinner />}
                progressPending={loading} />
        </div>
    );
}

export default TodoGrid;