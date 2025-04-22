import mongoose from "mongoose";

const gymSchema = mongoose.Schema({
    template: {
        type: String,
        required: true
    },
    exercises: [String]

},
    {
        timestamps: true
    }
);

const Gym = mongoose.model('Gym', gymSchema);

export default Gym;