const express = require('express');
const router = express.Router();
const ToDoController = require('../controller/ToDoController');
const authenticateJWT = require('../middleware/authJwt');

router.post('/create-todo', authenticateJWT,ToDoController.createToDo);
router.get('/get-all-todos/:userId', authenticateJWT, ToDoController.getAllToDos);
router.delete('/delete-todo/:id', authenticateJWT, ToDoController.deleteToDo);
router.patch('/update-todo/:id', authenticateJWT, ToDoController.updateToDo);


module.exports = router;