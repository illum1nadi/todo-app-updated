const express = require("express");
import { createTodo, updateTodo } from "./types";
const app = express();

app.use(express.json());

app.post("/todo", (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if(!parsedPayload.success) {
    res.status(411).json({
      msg : "The input format was incorrect"
    })
    return;
  }
})


app.get("/todos", (req, res) => {
  
})


app.put("/completed", (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo(updatePayload);
  if(!parsedPayload.success) {
    res.status(411).json({
      msg : "The input format was incorrect"
    })
    return;
  }
})


