const taskController = require("../controllers/taskController");

router = require("express").Router();

router.get('/:email',taskController.getAll);

router.get('/:id/:email', taskController.getById);

router.post('/',taskController.postTask);

router.put('/:id', taskController.updateTaskById);

router.delete('/:id/:email', taskController.deleteTaskById);

module.exports = router