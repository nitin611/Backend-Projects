const Todo=require("../models/Todo")

// define route handler-
exports.createTodo=async(req,res)=>{

    try {
        const {title,description}=req.body;
        const todo=await Todo.create({title,description})
        

        res.status(200).send({
            success:true,
            msg:"Task created Successfully",
            data:todo
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            msg:"Error in creating todo"
        });
    }
}

exports.getTodo=async(req,res)=>{
    try {
        // fetch all todos-
        const todos=await Todo.find({});
        res.status(200).send({
            success:true,
            msg:"All todos fetched",
            data:todos
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({
            success:false,
            msg:"Error in fetching the todos"
        })
    }
}

// id ke aadhar pe task ko fetch karne wale hai
exports.getTodoById=async(req,res)=>{
    try {
        // fetch id-
        const id=req.params.id;
        const todo=await Todo.findById({_id:id})
        // error in fetching todo given id-
        if(!todo){
            return res.status(404).send({
                success:false,
                msg:"No data found with given id"
            })
        }
        res.status(200).send({
            success:true,
            msg:"Data fetched with the id",
            data:todo
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({
            success:false,
            msg:"Error in fetching todo based on id"

        })
    }
}

exports.updateTodo=async(req,res)=>{
    try {
        const {id}=req.params
        const {title,description}=req.body
        const todo=await Todo.findByIdAndUpdate(
            {_id:id},
            {title,description}
        );
        res.status(200).send({
            success:true,
            msg:"Task updated successfully",
            data:todo
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success:false,
            msg:"Error in updating the todo"
        })
    }
}
exports.deleteTodo=async(req,res)=>{
    try {
        const {id}=req.params
        const todo=await Todo.findByIdAndDelete({_id:id})
        res.status(200).send({
            success:true,
            msg:"todo deleted successfully",
            data:todo
        });
    } catch (error) {
        res.status(500).send({
            success:false,
            msg:"Error in deleting todo"
        });
    }
}
