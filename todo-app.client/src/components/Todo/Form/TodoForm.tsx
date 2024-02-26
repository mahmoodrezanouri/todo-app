import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Todo from '../../../models/Todo';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import './TodoForm.css';

interface TodoFormProps {
    onSubmit: (todo: Todo) => void;
    error: string | null;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, error }) => {
    const [description, setDescription] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (description.trim() && dueDate) {
            onSubmit({ description, dueDate });
            if (error !== null) {
                setDescription('');
                setDueDate(null);
            }
        } else {
            alert('Please enter a description and select a due date.');
        }
    };

    return (
        <div className="todo-form-container">
            <h2>Create A New Todo Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label> Description: </label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label>Due Date: </label>
                    <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
                </div>

                <div className="field">
                    <button type="submit">Create</button>
                </div>
                <ErrorMessage message={error} />
            </form>
        </div>
    );
};

export default TodoForm;
