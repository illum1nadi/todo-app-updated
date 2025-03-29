const express = require("express");

import { createTodo, updateTodo } from "./types";
import { todo } from "./db";

const app = express();

app.use(express.json());

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if(!parsedPayload.success) {
    res.status(411).json({
      msg : "The input format was incorrect"
    })
    return;
  }

  await todo.create({
    title : createPayload.title,
    description : createPayload.description
  })

  res.json({
    msg : "Todo Created"
  })
})


app.get("/todos", async (req, res) => {
  const todos = await todo.find();
})


app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo(updatePayload);
  if(!parsedPayload.success) {
    res.status(411).json({
      msg : "The input format was incorrect"
    })
    return;
  }

  await todo.update({
    _id : req.body.id
  }, {
    completed : true
  })

  res.json({
    msg : "Todo marked as completed"
  })
})


