// src/controllers/TodoController.ts
import { Request, Response } from 'express';
import { ITodoService } from '../services/TodoService';
import { TodoModel } from '../models/Todo';

export class TodoController {
  constructor(private todoService: ITodoService) {}

  public createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title } = req.body;
      const todo = await this.todoService.createTodo(title);
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  public getTodoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const todo = await this.todoService.getTodoById(id);
      if (todo) {
        res.status(200).json(todo);
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  public getAllTodos = async (_req: Request, res: Response): Promise<void> => {
    try {
      const todos = await this.todoService.getAllTodos();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  public updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;
      const updatedTodo = await this.todoService.updateTodo(id, title, completed);
      if (updatedTodo) {
        res.status(200).json(updatedTodo);
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  public deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.todoService.deleteTodo(id);
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
