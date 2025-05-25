import express from "express";
const app = express();
import "dotenv/config";
const PORT = process.env.PORT;
import {
  getTask,
  getTaskById,
  postTask,
  updateTask,
  deleteTask,
} from "./controllers/tasklistCRUD";

import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/", express.static(path.join(__dirname, "views")));

app.use(express.json());

app.get("/tasks", getTask);

app.get("/tasks/:id", getTaskById);

app.post("/tasks", postTask);

app.put("/tasks/:id", updateTask);

app.delete("/tasks/:id", deleteTask);

app.listen(PORT, () => {
  console.log("Server is running in Port: " + PORT);
});
