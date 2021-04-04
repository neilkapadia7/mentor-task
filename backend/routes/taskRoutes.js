import express from 'express';
import {protect} from '../middleware/authMiddleware.js'
import {getTasks, addTask, updateTask, deleteTask} from '../controllers/taskController.js'

const router = express.Router();

// /api/tasks
router.get('/', protect, getTasks)
router.post('/', protect, addTask)
router.put('/:id', protect, updateTask)
router.delete('/:id', protect, deleteTask)

export default router;