import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const StartWorkout = () => {
  const { id } = useParams();
  const [exercises, setExercises] = useState([]);
  const [template, setTemplate] = useState("");
  const [counter, setCounter] = useState(0)
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
  });

  const handleCount = () => {
    setCounter(counter + 1)
  }
  
  return (
    <>
      <div className="max-w-xl mx-auto p-6 mt-8 bg-white shadow-2xl rounded-xl">
        <h1 className="text-3xl pb-5">{template}</h1>
        {exercises.map((ex, index) => (
          <div className="text-2xl text-blue-400" key={index}>
            {ex} 
            
            <div className="flex justify-between py-5 text-black text-xl">
              <p className="">Set</p>
              <p className="">Kg</p>
              <p className="">Reps</p>
              <button className="text-gray-600 border-2 rounded-2xl p-1 cursor-pointer">
                <FaCheck />
              </button>
              
            </div>
            <div className="flex justify-between mb-10 w-90 ">
                <p className="mr-15">{counter + 1}</p>
                <input type="text" className="border-gray-600  bg-gray-200 rounded-xl text-gray-700 w-20 " />
                <input type="text " className="border-gray-600  bg-gray-200 rounded-xl text-gray-700 w-20 "/>
              </div>
            <div className="flex justify-center ">
              <button className="text-2xl  bg-gray-300 rounded-2xl mx-10 w-full cursor-pointer mb-10">
                Add Set+
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StartWorkout;
