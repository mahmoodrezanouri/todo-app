import { useState } from 'react';
import TodoContainer from './containers/Todos/TodoContainer';
import TodoFormContainer from './containers/Todos/TodoFormContainer';

function App() {
    const [refreshTodos, setRefreshTodos] = useState<boolean>(true);

    const handleTodoFormSubmit = () => {

        setRefreshTodos(true);
        console.log('TodoForm submitted.');
    
    };

    return (
        <div className="App">

            <TodoFormContainer onFormSubmit={handleTodoFormSubmit} />
            <TodoContainer refreshTodos={refreshTodos} setRefreshTodos={setRefreshTodos} />

        </div>
    );
}

export default App;
