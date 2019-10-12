import React, { useState } from "react";

import { TodoList } from "./TodoList";
import { AddTodoFrom } from "./AddTodoForm";
import { v4 as uuid } from "uuid";

const initialTodos: Array<Todo> = [
  { id: uuid(), text: "walk the dog", complete: true },
  { id: uuid(), text: "write the app", complete: false }
];
const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo: ToggleTodo = selectedTodo => {
    const newTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        // console.log("old" + selectedTodo.complete);
        return {
          ...todo,
          complete: !todo.complete
        };
      }

      // console.log("changed" + todo.complete);
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo: AddTodo = newTodo => {
    newTodo.trim() !== "" &&
      setTodos([...todos, { id: uuid(), text: newTodo, complete: false }]);
  };
  return (
    <React.Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <AddTodoFrom addTodo={addTodo} />
    </React.Fragment>
  );
};

export default App;
