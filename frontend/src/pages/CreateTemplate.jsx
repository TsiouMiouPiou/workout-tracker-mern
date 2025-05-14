import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "./components/BackButton";

const CreateExercise = () => {
  const [exercises, setExercises] = useState([]);
  const [template, setTemplate] = useState("");
  const [exerciseName, setExercisesName] = useState("");
  const navigate = useNavigate();

  const handleSaveExercise = () => {
    if (template && !exerciseName) {
      alert("Template added");
      setExercisesName("");
    } else if (exercises && !template) {
      alert("Select a template");
      return;
    }
    setExercises((prev) => [...prev, exerciseName]);
    setExercisesName("");
  };

  const saveToBackend = () => {
    const data = {
      template,
      exercises,
    };

    axios
      .post("http://localhost:5000/exercises", data) // axios takes 2 parameters: 1) the endpoint that I send the request, 2) the body of the request - what I want to send to the server
      .then((res) => {
        setTemplate(res.data.data);
        setExercises(res.data.data);
        console.log(res.data);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert("Fill all forms", error);
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
  };

  return (
    <>
      <div>
        <BackButton />
      </div>
      <div className="max-w-xl mx-auto my-10 p-8 shadow-2xl rounded-2xl bg-white">
        <div className="flex flex-col gap-4">
          <input
            className="bg-blue-100 rounded-lg p-3 text-lg outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Template"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          />
          <input
            className="bg-blue-100 rounded-lg p-3 text-lg outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Exercise"
            value={exerciseName}
            onChange={(e) => setExercisesName(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-6 rounded-lg cursor-pointer"
              onClick={handleSaveExercise}
            >
              Add
            </button>
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg cursor-pointer"
              onClick={saveToBackend}
            >
              Save
            </button>
          </div>
        </div>

        <ul className="mt-8 list-disc list-inside space-y-2 text-lg">
          {exercises.map((ex, index) => (
            <li key={index}>{ex}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CreateExercise;
