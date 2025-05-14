import mongoose from "mongoose";

const gymSchema = mongoose.Schema(
  {
    template: {
      type: String,
      required: true,
    },
    exercises: [
      {
       name: {type: String, required: true},
        sets: [
          {
            number: {type: Number, required: false},
            kg: { type: Number, required: false },
            reps: { type: Number, required: false },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Gym = mongoose.model("Gym", gymSchema);

export default Gym;
