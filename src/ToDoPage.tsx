import React, { useEffect, useReducer, useRef, useState } from 'react';

import { TodoStatus } from './models/todo';
import Service from './service';
import {
    createTodo, deleteAllTodos, deleteTodo, setTodos, toggleAllTodos, updateTodoStatus,
    updateTodoToggle, updateTodoUpdateTodoContentAction
} from './store/actions';
import reducer, { initialState } from './store/reducer';

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = () => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<any>(null);
  const [valueInput, setValueInput] = useState<string>("");
  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const resp = await Service.createTodo(inputRef.current.value);
      dispatch(createTodo(resp));
      inputRef.current.value = "";
    }
  };

  const onUpdateTodoContent = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: string
  ) => {
    console.debug("e", e.key);
    if (e.key === "Enter") {
      dispatch(updateTodoUpdateTodoContentAction(todoId, valueInput));
      setValueInput("");
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
  };

  return (
    <div className="ToDo__container">
      <div className="Todo__creation">
        <input
          aria-label="todo-input"
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="ToDo__list">
        {todos
          .filter((todo) => {
            if (showing === "ALL") {
              return true;
            } else {
              return showing === todo.status;
            }
          })
          .map((todo, index) => {
            return (
              //   Không sử dụng index để làm key của item khi render một list
              <div key={todo.id} className="ToDo__item">
                <input
                  aria-label="todo-checkbox"
                  type="checkbox"
                  checked={TodoStatus.COMPLETED === todo.status}
                  onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                  placeholder="checkbox"
                />
                {todo.toggle ? (
                  <span
                    onDoubleClick={() => {
                      dispatch(updateTodoToggle(todo.id));
                      setValueInput(todo.content);
                    }}
                  >
                    {todo.content}
                  </span>
                ) : (
                  <input
                    aria-label="todo-content"
                    type="text"
                    className="todo-input-content"
                    value={valueInput}
                    onKeyPress={(e) => onUpdateTodoContent(e, todo.id)}
                    onChange={(e) => setValueInput(e.target.value)}
                  />
                )}
                <button
                  className="Todo__delete"
                  onClick={() => onDeleteTodo(todo.id)}
                >
                  X
                </button>
              </div>
            );
          })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input
            aria-label="todo-checkbox"
            type="checkbox"
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button
            className={`Action__btn ${showing === "ALL" && "active"}`}
            onClick={() => setShowing("ALL")}
          >
            All
          </button>
          <button
            className={`Action__btn ${
              showing === TodoStatus.ACTIVE && "active"
            }`}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`Action__btn ${
              showing === TodoStatus.COMPLETED && "active"
            }`}
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
