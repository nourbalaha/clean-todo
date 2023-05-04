import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.TODO_PORT || 3000
const DB_CONNECTION_STRING = process.env.TODO_DB_CONNECTION_STRING || "mongodb://localhost/todoapp"

export { PORT,DB_CONNECTION_STRING }