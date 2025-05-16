import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const WorkoutHistory = () => {
    const { id } = useParams();
    const [workouts, setWorkouts] = useState([])

    useEffect(() =>{
        axios.get(`http://localhost:5000/exercises/workouts`)
             .then((res) =>{
                setWorkouts(res.data.data.workouts);
             })
             .catch((error) =>{
                

                alert("There is an error");
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
             })
    },[id])
  return (
    <>
    <div className='max-w-5xl mx-auto mt-8 bg-white rounded-3xl shadow-xl p-8 flex justify-center'> 
        <h1 className='text-3xl text-blue-700 font-bold'>Workout History</h1>
        <div>
            {workouts.map((workout, index) => (
                <li key={index}>
                    {workout}
                </li>
            ))}
        </div>
    </div>
    </>
  )
}

export default WorkoutHistory