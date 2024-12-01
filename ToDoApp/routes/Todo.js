const express=require("express")
const router=express.Router();
const {createTodo,getTodo,getTodoById,updateTodo,deleteTodo}=require("../controllers/createTodo")

// define api routes here-

// create todo api route-
router.post("/createTodo",createTodo);
router.get("/getTodos",getTodo)
router.get("/getTodo/:id",getTodoById)
router.delete("/deleteTodo/:id",deleteTodo)
router.put("/updateTodo/:id",updateTodo)


// export-
module.exports=router