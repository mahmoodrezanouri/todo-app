import { useState } from 'react';
import TodoListContainer from './containers/Todo/TodoListContainer';
import TodoFormContainer from './containers/Todo/TodoFormContainer';

function App() {
    const [refreshTodos, setRefreshTodos] = useState<boolean>(true);

    const handleTodoFormSubmit = () => {
        setRefreshTodos(true);
    };

    return (
        <div className="App">

            <TodoFormContainer onFormSubmit={handleTodoFormSubmit} />
            <TodoListContainer refreshTodos={refreshTodos} setRefreshTodos={setRefreshTodos} />

        </div>
    );
}

export default App;
