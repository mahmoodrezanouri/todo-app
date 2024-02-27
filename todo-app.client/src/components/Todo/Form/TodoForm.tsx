import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Todo from '../../../models/Todo';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import './TodoForm.css';
import validationService from '../../../services/ValidationService';
import { parseErrorMessage } from '../../../utils/utility';

interface TodoFormProps {
    onSubmit: (todo: Todo) => void;
    error: string | null;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, error }) => {
    const [description, setDescription] = useState<string>('');
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [formErrors, setFormErrors] = useState<string | null>(error);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validationService.validateTodoForm(description, deadline);
  
        if (Object.keys(errors).length === 0) {
   
            onSubmit({ description, deadline });

            setDescription('');
            setDeadline(null);
          
        } else {
            const parsedErrors = parseErrorMessage(errors)
            setFormErrors(parsedErrors);
        }
    };
    useEffect(() => {
     
        if (error !== null) {
            setFormErrors(error);
        }
    }, [error, formErrors]);


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
                    <label>Deadline: </label>
                    <DatePicker selected={deadline} onChange={(date) => setDeadline(date)} />
                </div>

                <div className="field">
                    <button type="submit">Create</button>
                </div>
                <ErrorMessage message={formErrors} />
            </form>
        </div>
    );
};

export default TodoForm;
