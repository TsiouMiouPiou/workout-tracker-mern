import Gym from '../models/gym.model.js';

// SAVE EXERCISES    
export const createExercise = async (req, res) => {

    const all = req.body;

    if(!all.template || !all.exercises || !all.exercises.length === 0){
       return res.status(400).json("Send all required fields"); 
    }
    const newExercise = new Gym(all);
    try {    
        await newExercise.save();
        res.status(200).json({success: true, data: newExercise})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, msg: "Generic Error"});
    }
};

// SAVE SETS

// ADD EXERCISES 👌                                       
export const addExercise = async (req, res) => {
    const { id } = req.params;
    const newExercises = req.body.exercises;
  
    if (!newExercises || newExercises.length === 0) {
      return res.status(400).json("Send at least one exercise."); 
    }
  
    try {
      const updatedGym = await Gym.findByIdAndUpdate(id,
        {$push: {exercises: newExercises}}
      )
      if (!updatedGym) {
        return res.status(404).json({ success: false, msg: "Template not found" });
      }
  
      res.status(200).json({ success: true, data: updatedGym });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Generic Error" });
    }
  };
  
// GET ALL EXERCISES 👌
export const getAllExercises = async (req, res) => {
  const { id } = req.params
  
    try {
      // const exercises = await Gym.find({"exercises.name": "squatos"});  
       const exercises = await Gym.find({});
        return res.status(200).json({
            success: true,
            count: exercises.length,
            data: exercises
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, msg: "There is an error", error});
    }
};

// GET SINGLE EXERCISE
export const getSingleExercise = async(req, res) => {
    const { id } = req.params;
    const singleExercise = req.body;
    try {
        const exercise = await Gym.findById(id, singleExercise);
        res.status(200).json({success: true, msg: "Here the id", data: exercise})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, msg: "There is an error!"})
    }
}


// UPDATE EXERCISE 👌
export const updateExercise = async (req, res) => {
    
    try {
        const t = req.body;
        const { id } = req.params;
    
    if(!t.template || t.exercises.length === 0){
        return res.status(400).json({success: false, msg: "All fields required"})
    }
        const exercise = await Gym.findByIdAndUpdate(id, t, { new: true })
        if(!exercise){
            return res.status(400).json({success: false, msg: "Exercise not found"})
        }
            return res.status(200).json({success: true, data: exercise});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, msg: "Generic Error"});
    }
};

// DELETE TEMPLATE 👌

export const deleteTemplate = async (req, res) => {
    try {
        const { id }  = req.params
       
        const deletedExercise = await Gym.findByIdAndDelete(id);
        res.status(200).json({success: true, msg: "Exersice is deleted"})
        console.log(deletedExercise);
            
     } catch (error) {
        console.log(error);
        res.status(500).json({success: false, msg: "Server Error", error});
     }
}

// REMOVE EXERCISE 👌

export const removeExercise = async (req, res) => {
    try {
      const { id } = req.params;
      const { exerciseName } = req.body;
  
      const removedExercise = await Gym.findByIdAndUpdate(
        id,
        { $pull: { exercises: exerciseName } }, // $pull from exercises array
        { new: true } // return the updated document
      );
  
      res.status(200).json({ success: true, data: removedExercise });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "There is an error" });
    }
  }

  // DELETE ALL 👌
  
  export const deleteAll = async (req,res) =>{
    try {
      const all = req.body
      const removeAll = await Gym.deleteMany({});
      res.status(200).json({success: true, msg: "Succesfull Deletion"})
    } catch (error) {
      res.status(500).json({success: false, msg: "There is an error"})
    }
  }
  
