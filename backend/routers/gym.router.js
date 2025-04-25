import express from 'express';
import { createExercise, deleteExercise, getAllExercises, getSingleExercise, updateExercise, deleteAllExercises, addExercise } from '../controllers/gym.controller.js';

const router = express.Router();

router.post('/', createExercise);
router.post('/:id', addExercise)
router.get('/', getAllExercises);
router.get('/:id', getSingleExercise)
router.put('/:id', updateExercise)
router.delete('/:id', deleteExercise)
router.delete('/', deleteAllExercises)

export default router;