import mongoose from "mongoose";

const SetSchema = new mongoose.Schema({
  number: Number,
  kg: Number,
  reps: Number,
});

const ExerciseSchema = new mongoose.Schema({
  name: String,
  sets: [SetSchema],
});

const GymSchema = new mongoose.Schema({
  
  exercises: [ExerciseSchema],
  workouts: [
    {
      template: String,
      date: { type: Date, default: Date.now },
      exercises: [ExerciseSchema],
    },
  ],
});

const Gym = mongoose.model("Gym", GymSchema);

export default Gym;
