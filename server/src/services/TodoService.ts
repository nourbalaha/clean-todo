// src/services/TodoService.ts
import { ITodoRepository } from '../repositories/TodoRepository';
import { TodoModel } from '../models/Todo';

export interface ITodoService {
  createTodo(title: string): Promise<TodoModel>;
  getTodoById(id: string): Promise<TodoModel | null>;
  getAllTodos(): Promise<TodoModel[]>;
  updateTodo(id: string, title: string, completed: boolean): Promise<TodoModel | null>;
  deleteTodo(id: string): Promise<boolean>;
}

export class TodoService implements ITodoService {
  constructor(private todoRepository: ITodoRepository) {}

  public async createTodo(title: string): Promise<TodoModel> {
    return this.todoRepository.create(title);
  }

  public async getTodoById(id: string): Promise<TodoModel | null> {
    return this.todoRepository.findById(id);
  }

  public async getAllTodos(): Promise<TodoModel[]> {
    return this.todoRepository.findAll();
  }

  public async updateTodo(
    id: string,
    title: string,
    completed: boolean
  ): Promise<TodoModel | null> {
    return this.todoRepository.update(id, title, completed);
  }

  public async deleteTodo(id: string): Promise<boolean> {
    return this.todoRepository.delete(id);
  }
}
