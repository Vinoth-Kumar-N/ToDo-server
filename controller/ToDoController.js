const ToDo = require('../models/ToDoList');

async function createToDo(req, res) {
    try {
        const data = req.body;
        const todo = new ToDo(data);
        const result = await todo.save();
        console.log(result);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
}

async function getAllToDos(req, res) {
    try {
        let { userId } = req.params;
        const todos = await ToDo.find({ createdBy: userId });
        res.send(todos);

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
}

async function deleteToDo(req, res) {
    try {
        let { id } = req.params;
        const result = await ToDo.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
}

async function updateToDo(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await ToDo.findByIdAndUpdate(id, { $set: data }, { new: true });
        res.status(200).send({ message: "Updated successfully", data: result });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message }); F
    }
}


const ToDoController = {
    createToDo,
    getAllToDos,
    deleteToDo,
    updateToDo
}

module.exports = ToDoController;

