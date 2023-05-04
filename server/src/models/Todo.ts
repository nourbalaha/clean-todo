// src/models/Todo.ts
import { Schema, model, Document } from 'mongoose';

export interface TodoModel extends Document {
  title: string;
  completed: boolean;
}

const todoSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export default model<TodoModel>('Todo', todoSchema);
