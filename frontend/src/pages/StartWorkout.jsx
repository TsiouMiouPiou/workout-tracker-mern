import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StartWorkout = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // only id
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
    const currentSets = exercises[exerciseIndex].sets;
    const newSet = {
      number: currentSets.length + 1,
      kg: Number(kg),
      reps: Number(reps),
    };

    if (!kg || !reps) return alert("Kg and Reps cannot be empty or 0");

    const updatedExercises = exercises.map((exercise, index) => {
      if (index === exerciseIndex) {
        return {
          ...exercise,
          sets: [...exercise.sets, newSet],
        };
      }
      return exercise;
    });

    setExercises(updatedExercises);
    setKg("");
    setReps("");
  };

  const handleFinishWorkout = async () => {
    try {
      for (const exercise of exercises) {
        for (const set of exercise.sets) {
          await axios.post(`http://localhost:5000/exercises/${id}/${exercise._id}/sets`, {
            number: set.number,
            kg: set.kg,
            reps: set.reps
          });
        }
      }
  
      alert("Workout Saved!!!");
      navigate('/');
    } catch (error) {
      console.error("Error saving workout:", error);
      alert("There is an error saving the workout.");
    }
  };

  return (
    <div className="w-4xl mx-auto mt-8 bg-white rounded-xl">
      <h1 className="flex justify-center text-3xl pb-5 text-amber-500 font-bold">
        Workout Template: {template}
      </h1>
      {exercises.map((exercise, index) => (
        <div
          className="border-0 rounded-2xl p-5 shadow-2xl mt-10 bg-gray-100"
          key={index}
        >
          <h2 className="text-2xl font-semibold pb-6">{exercise.name}</h2>

          <ul>
            {exercise.sets.map((set, i) => (
              <li
                className="flex justify-between py-3 mb-4 font-semibold text-xl bg-blue-100 px-2 rounded-2xl"
                key={i}
              >
                <p className="text-blue-500">Sets: {set.number}</p>
                <p>Kg: {set.kg}</p>
                <p>Reps: {set.reps}</p>
              </li>
            ))}
          </ul>

          <div className="flex justify-between pb-5 text-xl">
            <input type="number" readOnly className="px-2 w-20" />
            <input
              type="number"
              value={kg}
              onChange={(e) => setKg(e.target.value)}
              placeholder="Kg"
              className="border px-2 rounded w-20 border-gray-300"
            />
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              placeholder="Reps"
              className="border px-2 rounded w-20 border-gray-300 text-xl p-1"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => handleSet(index)}
              className="cursor-pointer text-white text-xl font-semibold border-2 bg-green-500 rounded-2xl px-6 py-1"
              title="Add Set"
            >
              + Add Set
            </button>
          </div>
        </div>
      ))}
      <div className="mt-15 flex justify-center">
        <button
          className="text-2xl text-amber-50 border-2 rounded-2xl px-5 py-1 bg-red-500 cursor-pointer"
          onClick={handleFinishWorkout}
        >
          Finish Workout
        </button>
      </div>
    </div>
  );
};

export default StartWorkout;
