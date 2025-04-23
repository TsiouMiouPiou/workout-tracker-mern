import express from 'express';
import { createExercise, deleteExercise, getAllExercises, updateExercise, deleteAllExercises } from '../controllers/gym.controller.js';

const router = express.Router();

router.post('/', createExercise);
router.get('/', getAllExercises);
router.put('/:id', updateExercise)
router.delete('/:id', deleteExercise)
router.delete('/', deleteAllExercises)

export default router;