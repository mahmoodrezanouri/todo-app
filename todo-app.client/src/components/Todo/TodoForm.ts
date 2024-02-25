// TodoForm.tsx
import React, { useState } from 'react';

interface TodoFormProps {
  onSubmit: (description: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description);
      setDescription('');
    } else {
      alert('Please enter a description.');
    }
  };

  return (
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
        <button type="submit">Create TodoTask</button>
      </form>
  );
};

export default TodoForm;
