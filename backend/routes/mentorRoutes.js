import express from 'express'
import {registerMentor, authMentor,getMentors, updateMentor} from '../controllers/mentorController.js'
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router();

// /api/mentors
router.post('/', registerMentor)
router.get('/', protect, getMentors)
router.put('/:id', protect, updateMentor)
router.post('/login', authMentor)

export default router;