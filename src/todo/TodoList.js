import React, {useState,
  useEffect,
  useCallback,
  useRef}
  from 'react'
import './TodoList.css'

import {
  createSet,
  createAdd,
  createRemove,
  createToggle
} from './action'


let idSeq = Date.now();

function bindActionCreators(actionCreators, dispatch) {
  const ret = {};

  for (let key in actionCreators) {
    ret[key] = function(...args) {
      const actionCreator = actionCreators[key];
      const action = actionCreator(...args);
      dispatch(action);
    };
  }

  return ret;
}

function Control(props) {
  const { addTodo } = props;

  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const newText = inputRef.current.value.trim();
    if (newText.length === 0) {
      return;
    }

    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    });

    // dispatch(createAdd({
    //   id: ++idSeq,
    //   text: newText,
    //   complete: false
    // }));

    inputRef.current.value = '';
  };
  return (
    <div className="control">
      <h1>
        todos
      </h1>
      <form onSubmit={onSubmit}>
        <input type="text"
          ref={inputRef}
          className="new-todo"
          placeholder="write something?" />
      </form>
    </div>
  );
}

function Todos(props) {
  const {todos, removeTodo, toggleTodo} = props;
  return (
    <ul>
      {
        todos.map(todo => {
          return <TodoItem
                  key={todo.id}
                  todo={todo}
                  removeTodo={removeTodo}
                  toggleTodo={toggleTodo}
                  />
        })
      }
    </ul>
  );
}

function TodoItem (props) {
  const {
    todo: {
      id,
      text,
      complete
    },
    removeTodo,
    toggleTodo
  } = props;

  const onChange = () => {
    toggleTodo(id);
    // dispatch(createToggle(id));
  };

  const onRemove = () => {
    removeTodo(id);
    // dispatch(createRemove(id));
  };

  return (
    <li className="todo-item">
      <input type="checkbox"
       onChange={onChange}
       checked={complete} />
       <label className={complete ? 'complate': ''}>{text}</label>
       <button onClick={onRemove}>&#xd7;</button>
    </li>
  );
}

const LS_KEY = '$-todos_';

function TodoList() {
  const [todos, setTodos] = useState([]);

  // const addTodo = useCallback((todo) => {
  //   setTodos(todos => [...todos, todo]);
  // }, []);

  // const removeTodo = useCallback((id) => {
  //   setTodos(todos => todos.filter(todo => {
  //     return todo.id !== id;
  //   }));
  // }, []);

  // const toggleTodo = useCallback((id) => {
  //   setTodos(todos => todos.map(todo => {
  //     return todo.id === id
  //     ? {
  //       ...todo,
  //       complete: !todo.complete,
  //     }
  //     : todo;
  //   }));
  // }, []);

  const dispatch = useCallback((action) => {
    const {type, payload } = action;
    switch(type) {
      case 'set':
        setTodos(payload);
        break;
      case 'add':
        setTodos(todos => [...todos, payload]);
        break;
      case 'remove':
        setTodos(todos => todos.filter(todo => {
          return todo.id !== payload;
        }));
        break;
      case 'toggle':
        setTodos(todos => todos.map(todo => {
          return todo.id === payload
          ? {
            ...todo,
            complete: !todo.complete,
          }
          : todo;
        }));
        break;
      default:
    }
  }, []);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    // setTodos(todos);
    dispatch(createSet(todos));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <Control 
      {
        ...bindActionCreators({
          addTodo: createAdd
        }, dispatch)
      }
      />
      <Todos 
      {
        ...bindActionCreators({
          removeTodo: createRemove,
          toggleTodo: createToggle
        }, dispatch)
      } todos={todos} />
    </div>
  )
}

export default TodoList;