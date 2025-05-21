import express from 'express';
import { createExercise, 
         deleteTemplate, 
         getAllExercises, 
         getSingleExercise, 
         updateExercise,  
         addExercise, 
         removeExercise, 
         deleteAll, 
         saveSets,
         getSetForSingleExercise,
         saveWholeWorkout,
         getWorkoutHistory,
         getSingleWorkout,
         clearSets
                      } from '../controllers/gym.controller.js';

const router = express.Router();

router.post('/', createExercise);
router.post('/:id', addExercise);
router.post('/:id/:exerciseId/sets', saveSets)
router.post('/:id/workouts', saveWholeWorkout)


router.get('/workouts', getWorkoutHistory)
router.get('/:id/workouts', getSingleWorkout)

router.get('/', getAllExercises);
router.get('/:id', getSingleExercise)
router.get('/:id/:exerciseId/sets', getSetForSingleExercise)

router.put('/:id', updateExercise)
router.put('/:id/exercises/clear-sets', clearSets)
router.patch('/:id', removeExercise)

router.delete('/', deleteAll);
router.delete('/:id', deleteTemplate)


export default router;