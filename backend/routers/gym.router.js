import express from 'express';
import { createExercise, 
         deleteTemplate, 
         getAllExercises, 
         getSingleExercise, 
         updateExercise,  
         addExercise, 
         removeExercise, 
         deleteAll, 
          } from '../controllers/gym.controller.js';

const router = express.Router();

router.post('/', createExercise);
router.post('/:id', addExercise);

router.get('/', getAllExercises);
router.get('/:id', getSingleExercise)

router.put('/:id', updateExercise)
router.patch('/:id', removeExercise)

router.delete('/', deleteAll);
router.delete('/:id', deleteTemplate)


export default router;