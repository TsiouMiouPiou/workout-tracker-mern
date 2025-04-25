import React,  { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import BackButton from "./components/BackButton";

const CreateExercise = () => {
  const [exercises, setExercises] = useState([]);
  const [template, setTemplate] = useState('');
  const [exerciseName, setExercisesName] = useState('');
  const navigate = useNavigate();

  const handleSaveExercise = () => {
    setExercises((prev) => [...prev,  exerciseName]);
    setExercisesName('')
    if(!template || exerciseName.length === 0){
      alert("Please fill all the inputs");
      return;
    }
  }

  const saveToBackend = () => {
    const data = {
      template, 
      exercises
    };
    
    axios
        .post('http://localhost:5000/exercises', data)     // axios takes 2 parameters: 1) the endpoint that I send the request, 2) the body of the request - what I want to send to the server
        .then((res) => {
          setExercises(res.data.data)
          alert('Exercise added')
          console.log(res.data)
        })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          alert("Fill all forms", error)
        });
  }
    

  return (
    <>
    <div>
      <BackButton/>
    </div>
      <div className="flex justify-center my-10 px-10">
        <input className="bg-blue-200 mx-5"
         placeholder="Template"
         value={template}
         onChange={(e) => setTemplate(e.target.value)}
        />
        <input className="bg-blue-200"
         placeholder="Name"
         value={exerciseName}
         onChange={(e) => setExercisesName(e.target.value)}
        />
        <button
          className="border-2 border-amber-500 mx-2 px-5 cursor-pointer"
          onClick={handleSaveExercise}
        >
          Add exercise
        </button>
        <div></div>
        <button 
            className="border-2 border-blue-500 mx-2 px-5 cursor-pointer"
            onClick={saveToBackend}
        > Save</button>
        <Link to={"/"}>
        <div className="">
          <div>
            {exercises.map((ex, index) => (
              <li key={index}>{ex}</li>
            ))}
          </div>
        </div>
      </Link>
      </div>
     

      
    </>
  );
};

export default CreateExercise;
