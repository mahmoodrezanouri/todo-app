import { FC } from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
    message: string | null;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {

    if (message == null) {
        return '';
    }

    return (
        <div className="error-message">
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;
