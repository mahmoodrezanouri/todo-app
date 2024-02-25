import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Todo from '../../models/Todo';
import ErrorMessage from "../../components/Error/ErrorMessage";


interface TodoFormProps {
    onSubmit: (todo: Todo) => void;
    error: string | null;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, error }) => {

    const [description, setDescription] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    //const [errort, setError] = useState<string | null>(error);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (description.trim() && dueDate) {
            onSubmit({ description, dueDate }); 
            setDescription('');
            setDueDate(null);
            //setError(null);
        } else {
            alert('Please enter a description and select a due date.');
        }
    };
    //useEffect(() => {
    //    setError(error);

    //}, [error]);

    return (
        <div>
            <h2>Create a new TodoTask</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Due Date:
                    <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
                </label>

                <ErrorMessage message={error} />

                <button type="submit">Create TodoTask</button>
            </form>
        </div>
    );
};

export default TodoForm;

