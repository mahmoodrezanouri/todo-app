import { FC } from 'react';
import DataGrid from 'react-data-table-component';
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import ErrorMessage from "../../../components/Error/ErrorMessage";
import Todo from '../../../models/Todo';
import './TodoGrid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';

interface TodoGridProps {
    todos: Todo[];
    totalPages: number;
    onPageChange: (page: number) => void;
    onPerRowsChange: (newPerPage: number, page: number) => void;
    loading: boolean;
    error: Error | null;
    currentPage: number;
    onDelete: (id: number) => void;
    markTaskAsDone: (id: number) => void;
    markTaskAsUnDone: (id: number) => void;
}

const TodoGrid: FC<TodoGridProps> = ({ todos, totalPages, onPageChange, onPerRowsChange, loading, error, markTaskAsDone, markTaskAsUnDone, onDelete }) => {

    if (error) {
        return <ErrorMessage message={error.message} />;
    }

    const columns = [
        {
            name: 'Id',
            selector: (row: Todo) => row.id,
        },
        {
            name: 'Description',
            selector: (row: Todo) => row.description,
        },
        {
            name: 'Due Date',
            selector: (row: Todo) => row.dueDate,
        },
        {
            name: 'Deadline',
            selector: (row: Todo) => row.deadline
        },
        {
            name: 'Done',
            cell: (row: Todo) => (
                <Switch
                    checked={row.done}
                    onChange={() => handleToggleDone(row.id, row.done)}
                />
            ),
        },
        {
            name: '',
            cell: (row: Todo) => (
                <a className="delete-icon" onClick={() => handleDelete(row.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </a>
            ),
        },
    ];

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    const handlePerRowsChange = (newPerPage: number, page: number) => {
        onPerRowsChange(newPerPage, page);
    };

    const handleDelete = (taskId: number) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this task?');

        if (isConfirmed) {
            onDelete(taskId);
        }
    };

    const handleToggleDone = (id: number, isDone: boolean) => {
        const confirmationMessage = isDone
            ? 'Are you sure you want to set this task as undone?'
            : 'Are you sure you want to set this task as done?';

        const isConfirmed = window.confirm(confirmationMessage);

        if (isConfirmed) {
            if (isDone) {
                markTaskAsUnDone(id);
            } else {
                markTaskAsDone(id);
            }
        }
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
                progressPending={loading}
                conditionalRowStyles={[
                    {
                        when: (row: Todo) => row.overDue,
                        classNames: ['overdue-row']
                    },
                    {
                        when: (row: Todo) => row.done,
                        classNames: ['done-row']
                    }
                ]}
             
            />
        </div>
    );
}

export default TodoGrid;
