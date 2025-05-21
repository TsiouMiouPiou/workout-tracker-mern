import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "./components/BackButton";

const StartWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [template, setTemplate] = useState("");
  const [kg, setKg] = useState("");
  const [reps, setReps] = useState("");
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then((res) => {
        setExercises(res.data.data.exercises);
        setTemplate(res.data.data.template);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSet = (exerciseIndex) => {
    if (!kg || !reps) return alert("Kg and Reps cannot be empty or 0");

    const updatedExercises = exercises.map((exercise, index) => {
      if (index === exerciseIndex) {
        const newSet = {
          number: exercise.sets.length + 1,
          kg: Number(kg),
          reps: Number(reps),
        };
        return { ...exercise, sets: [...exercise.sets, newSet] };
      }
      return exercise;
    });

    setExercises(updatedExercises);
    setKg("");
    setReps("");
  };

const handleFinishWorkout = async () => {
  try {
    // 1. Save the Workout 
    await axios.post(`http://localhost:5000/exercises/${id}/workouts`, {
      template,
      exercises,
    });

    // 2. Clear the sets from the DB
  await axios.put(`http://localhost:5000/exercises/${id}/exercises/clear-sets`);
    // Clear all sets in the frontend
    const clearedExercises = exercises.map((ex) => ({
      ...ex,
      sets: [],
    }));
    setExercises(clearedExercises);

    setKg("");   // Also clear inputs just in case
    setReps("");

    alert("Workout successfully saved!");
    navigate("/"); // Go back to home or refresh
  } catch (error) {
    console.error("Error saving workout:", error);
    alert("Failed to save workout.");
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <BackButton />
      </div>
      <div className="max-w-5xl mx-auto mt-8 bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-center text-4xl font-bold text-amber-600 mb-10">
          Start Workout '{template} Template'
        </h1>

        {exercises.map((exercise, index) => (
          <div
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg mb-10"
            key={exercise._id}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {exercise.name}
            </h2>

            <ul className="space-y-4">
              {exercise.sets.map((set, i) => (
                <li
                  className="flex justify-between items-center p-4 bg-blue-50 rounded-xl shadow-sm"
                  key={i}
                >
                  <span className="text-blue-600 font-semibold">
                    Set {set.number}
                  </span>
                  <span className="font-medium">Kg: {set.kg}</span>
                  <span className="font-medium">Reps: {set.reps}</span>
                </li>
              ))}
            </ul>

            <div className="flex gap-4 mt-6">
              <input
                type="number"
                value={kg}
                onChange={(e) => setKg(e.target.value)}
                placeholder="Kg"
                className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
              <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="Reps"
                className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
              <button
                onClick={() => handleSet(index)}
                className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                + Add Set
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-12">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold text-xl px-8 py-3 rounded-2xl shadow-lg transition"
            onClick={handleFinishWorkout}
          >
            Finish Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartWorkout;
