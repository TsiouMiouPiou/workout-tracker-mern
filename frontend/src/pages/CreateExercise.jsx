import React,  { useState } from "react";
import BackButton from "/components/BackButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const CreateExercise = () => {
  const [exercises, setExercises] = useState([]);
  const [template, setTemplate] = useState('');
  const [exercisesName, setExercisesName] = useState('');
  // const navigate = useNavigate();

  const handleSaveExercise = () => {
    setExercises(prev => [...prev, {name: exercisesName}]);
    setExercisesName('');
  }

  const handleSaveToBackend = () => {
    if(!template || exercises.length === 0){
      alert("Please fill all the inputs");
      return;
    }
    const data = {
      template, 
      exercises,
    };
    axios.post('http://localhost:5000/exercises', data) 
    // axios takes 2 parameters: 1) the endpoint that I send the request, 2) the body of the request - what I want to send to the server
        .then((res) => {
          alert('Exercise added')
          console.log(res.data)
        })
        // .then(() => {
        //   navigate('/');
        // })
        .catch((error) => {
          alert("Fill all forms", error)
        });
  }

  return (
    <>
      <div className="flex justify-center my-10 px-10">
        <input className="bg-blue-200 mx-5"
         placeholder="Template"
         value={template}
         onChange={(e) => setTemplate(e.target.value)}
        />
        <input className="bg-blue-200"
         placeholder="Name"
         value={exercisesName}
         onChange={(e) => setExercisesName(e.target.value)}
        />
        <button
          className="border-2 border-amber-500 mx-2 px-5 cursor-pointer"
          onClick={handleSaveExercise}
        >
          Add exercise
        </button>
        <button 
            className="border-2 border-blue-500 mx-2 px-5 cursor-pointer"
            onClick={handleSaveToBackend}
        > Save</button>
      </div>
      <div className="flex flex-col  w-[500px]">
        
      </div>
      <Link to={"/"}>
        <div className="flex justify-center">
          <div>
            {exercises.map((ex, index) => (
              <li key={index}>{ex.name}</li>
            ))}
          </div>
          <button className="bg-amber-300 border-2 px-10 cursor-pointer">
            Home
          </button>
        </div>
      </Link>
    </>
  );
};

export default CreateExercise;
