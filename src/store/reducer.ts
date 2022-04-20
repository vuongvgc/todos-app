import { Todo, TodoStatus } from '../models/todo';
import {
    AppActions, CREATE_TODO, DELETE_ALL_TODOS, DELETE_TODO, TOGGLE_ALL_TODOS, UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>;
}
const getTodosFromLocalStrorage = () => {
  const todoLocalStore = window.localStorage.getItem("todos-app");
  if (todoLocalStore) {
    return JSON.parse(todoLocalStore).todos;
  } else {
    return [];
  }
};
export const initialState: AppState = {
  todos: getTodosFromLocalStrorage(),
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      // Không được modify state. Phải copy ra và gán lại state
      window.localStorage.setItem(
        "todos-app",
        JSON.stringify({
          ...state,
          todos: [...state.todos, action.payload],
        })
      );
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      window.localStorage.setItem(
        "todos-app",
        JSON.stringify({
          ...state,
          todos: state.todos,
        })
      );
      return {
        ...state,
        todos: state.todos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });
      window.localStorage.setItem(
        "todos-app",
        JSON.stringify({
          ...state,
          todos: tempTodos,
        })
      );
      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      window.localStorage.setItem(
        "todos-app",
        JSON.stringify({
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        })
      );
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case DELETE_ALL_TODOS:
      window.localStorage.setItem(
        "todos-app",
        JSON.stringify({
          ...state,
          todos: [],
        })
      );
      return {
        ...state,
        todos: [],
      };

    default:
      return state;
  }
}

export default reducer;
