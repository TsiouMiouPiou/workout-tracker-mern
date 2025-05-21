import { useEffect, useState } from "react";
import axios from "axios";

const WorkoutHistory = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/workouts")
      .then((res) => {
        console.log("Response data:", res.data.workoutHistory); // For debugging
        const allWorkouts = res.data.workoutHistory;
        setWorkoutHistory(allWorkouts);
      })
      .catch((error) => {
        console.error("Full axios error:", error);
        if (error.response) {
          console.log("Response Data", error.response.data);
          console.log("Status code", error.response.status);
          console.log("Headers", error.response.headers);
        } else if (error.request) {
          console.log("No response received, Request was:", error.request);
        } else {
          console.log("Error setting up the request", error.message);
        }
      });
  }, []);

  return (
    <>
      <h1 className="text-3xl text-blue-700 font-bold text-center pt-10">
        Workout History
      </h1>

      <div className="max-w-3xl mx-auto mt-8 bg-white rounded-3xl shadow-xl flex justify-center">
        <div className="">
          {workoutHistory.map((workout, index) => (
            <div
              key={index}
              className="mb-6 border-2 rounded-2xl p-5 bg-emerald-100 px-20"
            >
              <div className="flex">
                <h2 className="text-3xl font-semibold text-gray-800 mb-2 mr-10">
                  Workout {index + 1}
                </h2>
                
                <p className=" text-cyan-600">
                  {new Date(workout.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    
                  })}
                </p> 
                
              </div>
              <div className="flex justify-center">
                <h2 className="text-2xl pr-10 p-5 font-bold text-blue-500"> {workout.template}</h2>
              </div>
              {workout.exercises.map((ex, i) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold text-2xl text-cyan-500">{ex.name}</p>
                  <ul className="list-disc list-inside ml-4 font-mono">
                    {ex.sets.map((set, j) => (
                      <li key={j}>
                        Set {set.number}: {set.kg} kg × {set.reps} reps
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkoutHistory;

// When I delete a template, the workout history is also deleted 
// Which is something I dont want to happen.
