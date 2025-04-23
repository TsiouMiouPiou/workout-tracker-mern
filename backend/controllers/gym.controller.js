import Gym from '../models/gym.model.js';

// SAVE EXERCISE    
export const createExercise = async (req, res) => {

    const all = req.body;

    if(!all.template || !all.exercises || !all.exercises.length === 0){
       return res.status(400).json("Send all required fields"); // return stops the execution of the rest of the code
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

// GET ALL EXERCISES
export const getAllExercises = async (req, res) => {
    try {
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


// UPDATE EXERCISE
export const updateExercise = async (req, res) => {
    
    try {
        const all = req.body;
    
    if(!all.template || !all.exercises){
        return res.status(400).json({success: false, msg: "All field required"})
    }
        const exercise = await Gym.findByIdAndUpdate(id, req.body, { new: true })
        if(!exercise){
            return res.status(400).json({success: false, msg: "Exercise not found"})
        }
            return res.status(200).json({success: true, data: exercise});
    } catch (error) {
        console.log(message.error);
        res.status(500).json({success: false, msg: "Generic Error"});
    }
};

// DELETE EXERCISE

export const deleteExercise = async (req, res) => {
    try {
        const { id }  = req.params
        const exercises = req.body
       
        const deletedExercise = await Gym.findByIdAndDelete(id);
        res.status(200).json({success: true, msg: "Exersice is deleted", exercises})
        console.log(deletedExercise);
            
     } catch (error) {
        console.log(error);
        res.status(500).json({success: false, msg: "Server Error", error});
     }
}

// DELETE ALL EXERCISES

export const deleteAllExercises = async (req, res) => {
    try {
        const deleteAll = await Gym.deleteMany({})
        res.status(200).json({success: true,
                             msg: "All exercises are deleted!",
                             deletedCount: deleteAll.deletedCount,
                            }, 
                             deleteAll)
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, msg: "There is an error!"});
    }
}