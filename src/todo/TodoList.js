import React, {useState,
  useCallback}
  from 'react'
import './TodoList.css'

function Control(props) {
  const { addTodo } = props;

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="control">
      <h1>
        todos
      </h1>
      <form onSubmit={onSubmit}>
        <input type="text"
          className="new-todo"
          placeholder="write something?" />
      </form>
    </div>
  );
}

function Todos() {
  return <div></div>
}

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo]);
  }, []);

  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => {
      return todo.id !== id;
    }));
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map(todo => {
      return todo.id === id
      ? {
        ...todo,
        complete: !todo.complete,
      }
      : todo;
    }));
  }, []);

  return (
    <div className="todo-list">
      <Control addTodo={addTodo} />
      <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  )
}

export default TodoList;