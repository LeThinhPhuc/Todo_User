const taskController = require("../controllers/taskController");

router = require("express").Router();

router.get('/:email/:page',taskController.getAll);

router.get('/:id/:email', taskController.getById);

router.post('/:page',taskController.postTask);

router.put('/:id/:page', taskController.updateTaskById);

router.delete('/:id/:email/:page', taskController.deleteTaskById);

module.exports = router