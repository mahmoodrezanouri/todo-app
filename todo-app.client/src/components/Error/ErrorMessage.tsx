import { FC } from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
    message: string | null;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {

    if (message == null) {
        return '';
    }
    const errorLines = message.split('<br />');

    return (
        <div className="error-message">
        <ul >
            {errorLines.map((line, index) => (
                <li key={index}>{line}</li>
            ))}
            </ul>
        </div>
    );
  
};

export default ErrorMessage;
