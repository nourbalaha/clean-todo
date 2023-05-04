// src/index.ts
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import { TodoController } from './controllers/TodoController';
import { TodoService } from './services/TodoService';
import { TodoRepository } from './repositories/TodoRepository';
import { PORT, DB_CONNECTION_STRING } from './config'

// Create the Express application
const app: Application = express();
app.use(express.json());

// Configure MongoDB connection
mongoose.connect(DB_CONNECTION_STRING)
.then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Initialize the Todo components
const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

// Define the routes
app.post('/todos', todoController.createTodo);
app.get('/todos/:id', todoController.getTodoById);
app.get('/todos', todoController.getAllTodos);
app.put('/todos/:id', todoController.updateTodo);
app.delete('/todos/:id', todoController.deleteTodo);

// Handle 404 errors
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
