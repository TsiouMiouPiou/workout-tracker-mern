import axios from 'axios';
import { Link } from "react-router-dom";
import CreateExercise from "./CreateExercise";
import { HiArrowNarrowDown } from "react-icons/hi";
import { useEffect, useState } from 'react';

const Home = () => {

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
        .get("http://localhost:5000/exercises")
        .then((res) => {
          setExercises(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  return (
    <>
        <div className="flex justify-center">
          <h1 className="text-5xl text-blue-400 my-10 ">Tsiou GYM</h1>
        </div>

      <div className="flex justify-center gap-20 ">
        <div className="flex border-2 bg-amber-400 px-10 cursor-pointer">
        <div>
            {exercises.map((exercise) => (
              <div key={exercise._id}>
                <h1 className='text-3xl'>{exercise.template}</h1>
                <li className='text-2xl my-5'>{exercise.exercises}</li>
              </div>
            ))}
          </div>
        
          {/* <p ><HiArrowNarrowDown /></p> */}
        </div>
        
      </div>
      
        <Link to={"/create"} className='mx-100'>
          <button className="text-blue-400 cursor-pointer">Create</button>
        </Link>
   
      
    </>
  );
};

export default Home;

