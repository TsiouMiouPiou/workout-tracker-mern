import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "./components/BackButton";
import { IoIosRemoveCircle } from "react-icons/io";

const DeleteExercise = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [template, setTemplate] = useState();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/exercises/${id}`)
         .then((res) => {
          setTemplate(res.data.data.template);
          setExercises(res.data.data.exercises);
    });
  }, []);

  const handleSaveRemovedExercises = () => {
    const data = {
      template,
      exercises,
    };
    axios
      .delete(`http://localhost:5000/exercises/${id}`, data)
      .then((res) => {
        setExercises(res.data.data.exercises);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("There is an error");
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
      <BackButton />

      <div className="max-w-xl mx-auto p-6 mt-8 bg-white shadow-2xl rounded-xl">
        <h1 className="text-3xl text-red-500">Delete Exercises</h1>
        {exercises.map((ex, index) => (
          <div className="text-2xl flex justify-between mt-10" key={index}>
            {ex}
            <button onClick={handleSaveRemovedExercises}>
              <IoIosRemoveCircle className="text-red-500 text-3xl cursor-pointer" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default DeleteExercise;
