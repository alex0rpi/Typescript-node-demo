import { RequestHandler } from 'express';

import { Todo } from '../models/todo';

let TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.floor(Math.random() * 10).toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(201).json({ message: 'here is the list', todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  try {
    const { id } = req.params;
    const { newText } = req.body as { newText: string };
    const todoIndex = TODOS.findIndex((item) => item.id === id);
    if (!todoIndex || todoIndex < 0) {
      throw new Error('Todo item was not found');
    }
    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, newText);
    return res.status(202).json({ message: `Todo ${id} was modified`, updatedTodo: TODOS[todoIndex] });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  try {
    const { id } = req.params;
    const todoIndex = TODOS.findIndex((item) => item.id === id);
    if (!todoIndex || todoIndex < 0) {
      throw new Error('No task found');
    }
    TODOS.splice(todoIndex, 1)
    // OR
    // TODOS = TODOS.filter((item) => item.id !== id);
    return res.status(200).json({ message: `Task ${id} was deleted`, updatedList: TODOS });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(404).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'Unknown error occurred' });
    }
  }
};
