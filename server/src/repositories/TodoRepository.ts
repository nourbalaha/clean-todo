// src/repositories/TodoRepository.ts
import Todo, { TodoModel } from '../models/Todo';

export interface ITodoRepository {
  create(title: string): Promise<TodoModel>;
  findById(id: string): Promise<TodoModel | null>;
  findAll(): Promise<TodoModel[]>;
  update(id: string, title: string, completed: boolean): Promise<TodoModel | null>;
  delete(id: string): Promise<boolean>;
}

export class TodoRepository implements ITodoRepository {
  public async create(title: string): Promise<TodoModel> {
    return Todo.create({ title });
  }

  public async findById(id: string): Promise<TodoModel | null> {
    return Todo.findById(id);
  }

  public async findAll(): Promise<TodoModel[]> {
    return Todo.find();
  }

  public async update(id: string, title: string, completed: boolean): Promise<TodoModel | null> {
    return Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
  }

  public async delete(id: string): Promise<boolean> {
    const result = await Todo.findByIdAndDelete(id);
    return result !== null;
  }
}
