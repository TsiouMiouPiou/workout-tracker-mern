import React from 'react'
import BackButton from './components/BackButton';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState('')
  const [exercises, setExercises] = useState([]);
  const [current, setCurrent] = useState(null);
  const [newExercise, setNewExercise] = useState('')
  

  // Calling database
  useEffect(() => {
    axios
        .get(`http://localhost:5000/exercises/${id}`)
        .then((res) => {
          setTemplate(res.data.data.template)
          setExercises(res.data.data.exercises)
        })
        .catch((error) => {
          alert("There is an error!")
          console.log(error);
        })
      },[])  


// Function to handle the editing
const handleEditClick = (index) => {
  setCurrent(index);
  setNewExercise(exercises[index])  
}

const handleSave = () =>{
  if(current === null || !newExercise.trim())return;

    const updatedExercises = [...exercises];
    updatedExercises[current] = newExercise;

    const newData = {
      template,
      exercises: updatedExercises
    }

    axios
          .put(`http://localhost:5000/exercises/${id}`, newData)
          .then(() =>{
            alert("Exercise has been succesfully saved")
            
          })
          .catch((error) =>{
            console.log(error);
          })
}
// Function to update the updated exercise

      // Send exercises to the backend
   
      
      

  return (
    <>
    <div className=''>
      <BackButton/>
    </div>
      <div className="max-w-xl mx-auto p-6 mt-8 bg-white shadow-2xl rounded-xl">
              <h1 className='text-center text-3xl text-amber-400 '>Edit Template: {template}</h1>
                <ul className=' justify-between items-center '>
                  {exercises.map((ex, index) => (
                   <li key={index} className='flex justify-between border-1 my-5 py-2 px-3 rounded-xl'>
                    <span className='text-xl'>{ex}</span>
                    <button 
                            className='bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500'
                            onClick={() => handleEditClick(index)}
                            >Edit
                            </button>
                   </li>
                  ))}
                </ul>
                {current !== null && (
                  <div className=''>
                    <h1 className='text-2xl pt-10 text-blue-00'>Edit Exercise</h1>
                    <input 
                          type="text"
                          className='border-1 border-black rounded-2xl px-3 py-3 mt-2 text-blue-400 w-full'
                          value={newExercise}
                          onChange={(e) => setNewExercise(e.target.value)}
                          />
                           <button className='border-green-500 border-2 bg-green-300 rounded-1xl py-2 my-5 w-full'
                                  onClick={handleSave}>
                            Save</button>
                  </div>
                )}
        </div>
    </>
  )
}

export default EditExercise;