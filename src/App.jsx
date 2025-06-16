import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Context';
import { TodoForm, TodoItem } from './Components';

function App() {
  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt'); // 'createdAt' or 'dueDate'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const sortTodos = (todos) => {
    return [...todos].sort((a, b) => {
      const dateA = new Date(a[sortBy] || 0);
      const dateB = new Date(b[sortBy] || 0);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  useEffect(() => {
    const mydos = JSON.parse(localStorage.getItem("todos"));
    if (mydos && mydos.length > 0) {
      setTodos(mydos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const sortedTodos = sortTodos(todos);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl px-6 py-6 text-white border border-white/20">
          <h1 className="text-3xl font-bold text-center mb-8 mt-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Manage Your Todos
          </h1>
          
          <div className="mb-6">
            <TodoForm />
          </div>

          <div className="mb-6 flex gap-3 justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-white/20 rounded-xl px-4 py-2 outline-none duration-150 bg-white/10 text-white focus:ring-2 focus:ring-purple-500 hover:bg-white/20 transition-all"
            >
              <option value="createdAt" className='bg-purple-900'>Sort by Created Date</option>
              <option value="dueDate" className='bg-purple-900'>Sort by Due Date</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="border border-white/20 rounded-xl px-4 py-2 outline-none duration-150 bg-white/10 text-white hover:bg-white/20 focus:ring-2 focus:ring-purple-500 transition-all"
            >
              {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {sortedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
                toggleComplete={toggleComplete}
              />
            ))}
            {sortedTodos.length === 0 && (
              <div className="text-center text-white/60 py-12 text-lg">
                No todos yet. Add one above!
              </div>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
