const express = require("express");
const cors = require("cors")
const {createTodo, updateTodo} = require("./types");
const {todo} = require("./db")

const app = express();

app.use(cors())
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
  res.json(todos);
})


app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
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

app.listen(3002, console.log("Server is listening on port 3002."))

