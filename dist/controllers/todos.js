"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
let TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.floor(Math.random() * 10).toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.status(201).json({ message: 'here is the list', todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    try {
        const { id } = req.params;
        const { newText } = req.body;
        const todoIndex = TODOS.findIndex((item) => item.id === id);
        if (!todoIndex || todoIndex < 0) {
            throw new Error('Todo item was not found');
        }
        TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, newText);
        return res.status(202).json({ message: `Todo ${id} was modified`, updatedTodo: TODOS[todoIndex] });
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    try {
        const { id } = req.params;
        const todoIndex = TODOS.findIndex((item) => item.id === id);
        if (!todoIndex || todoIndex < 0) {
            throw new Error('No task found');
        }
        TODOS.splice(todoIndex, 1);
        // OR
        // TODOS = TODOS.filter((item) => item.id !== id);
        return res.status(200).json({ message: `Task ${id} was deleted`, updatedList: TODOS });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};
exports.deleteTodo = deleteTodo;
