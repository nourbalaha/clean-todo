import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState<{id: string; title: string; description: string; completed: boolean}[]>([]);

  useEffect(() => {
    fetch('/api/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
