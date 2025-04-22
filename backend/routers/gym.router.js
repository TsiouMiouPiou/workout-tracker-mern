import express from 'express';
import { createExercise, deleteExercise, getAllExercises, updateExercise } from '../controllers/gym.controller.js';

const router = express.Router();

router.post('/', createExercise);
router.get('/', getAllExercises);
router.put('/:id', updateExercise)
router.delete('/:id', deleteExercise)

export default router;