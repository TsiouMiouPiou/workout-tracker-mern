import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "./components/BackButton";
import { IoIosRemoveCircle } from "react-icons/io";

const DeleteExercise = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/exercises/${id}`).then((res) => {
      setExercises(res.data.data.exercises);
    });
  }, [id]);

  const handleSaveRemovedExercises = (exerciseName) => {
    axios
      .patch(`http://localhost:5000/exercises/${id}`, { exerciseName })
      .then((res) => {
        const updatedExercises = res.data.data.exercises;
        setExercises(updatedExercises);
        if (updatedExercises.length === 0) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("There is an error");
      });
  };
  return (
    <>
      <BackButton />

      <div className="max-w-xl mx-auto p-6 mt-8 bg-white shadow-2xl rounded-xl">
        <h1 className="text-3xl text-red-500">Delete Exercises</h1>
        {exercises.length === 0 ? (
          <p className="text-2xl ">No exercises to delete</p>
        ) : (
          exercises.map((ex, index) => (
            <div className="text-2xl flex justify-between mt-10" key={index}>
              {ex}
              <button onClick={() => handleSaveRemovedExercises(ex)}>
                <IoIosRemoveCircle className="text-red-500 text-3xl cursor-pointer" />
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default DeleteExercise;
