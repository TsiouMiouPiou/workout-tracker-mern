import axios from 'axios';
import { Link } from "react-router-dom";
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
        <Link to={"/create"} className='mx-10'>
          <button className="text-3xl text-blue-500 cursor-pointer">Create New Template</button>
        </Link>
      <div className="flex justify-center my-10">
        <div className="flex px-10 cursor-pointer">
        <div className='flex flex-row gap-10'>
            {exercises.map((exercise) => (
              <div className='border-2 rounded-2xl'  
                   key={exercise._id} >
                {/* <h3>{exercise._id}</h3> */}
                <h1 className='text-4xl text-green-600 text-center py-5'>{exercise.template}</h1>
                <ol className='text-2xl italic my-5 mx-10 max-h-40 overflow-y-auto pr-4'>
                  {exercise.exercises.map((name,index) => (
                    <li key={index}>{index + 1}: {name}</li>
                  ))}
                  </ol>
              </div>
            ))}
          </div>
        
          {/* <p ><HiArrowNarrowDown /></p> */}
        </div>
        
      </div>
      
       
   
      
    </>
  );
};

export default Home;

