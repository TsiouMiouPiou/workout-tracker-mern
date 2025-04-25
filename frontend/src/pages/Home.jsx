import axios from "axios";
import { Link } from "react-router-dom";
import { HiArrowNarrowDown } from "react-icons/hi";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FcDeleteDatabase } from "react-icons/fc";

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
     
        <h1 className="text-5xl text-blue-400 my-10 pl-10">Tsiou GYM</h1>
      <div className="flex justify-center">
      <Link to={"/create"} className="mx-10">
        <button className="text-3xl text-blue-500 cursor-pointer">
          Create New Template
        </button>
      </Link>
      </div>
      <div className="flex justify-center my-10">
        <div className="">
          <div className="grid grid-cols-3 gap-10">
            {exercises.map((exercise) => (
              <div
                className="border-2 rounded-2xl w-100  gap-10"
                key={exercise._id}
              >
                {/* <h3>{exercise._id}</h3> */}
                <h1 className="text-4xl text-green-600 text-center py-5">
                  {exercise.template}
                </h1>
                <h2 className="text-xl text-amber-300 text-center py-5">
                  {exercise._id}
                </h2>
                <div className="flex justify-center">
                  <Link to={`deleteAll/${exercise._id}`} className="text-3xl">
                    <FcDeleteDatabase />
                  </Link>
                </div>
                <ol className="text-2xl my-5 mx-5 max-h-60 overflow-y-auto pr-4">
                  {exercise.exercises.map((name, index) => (
                    <li
                      className="flex justify-between items-center"
                      key={index}
                    >
                      {index + 1}: {name}
                      <div className="flex gap-1 py-5 text-xl px-4"></div>
                    </li>
                  ))}
                </ol>
                <div className="flex justify-center text-3xl gap-5 pb-5">
                  <Link to={`/edit/${exercise._id}`}>
                    <MdEdit className="text-gray-400" />
                  </Link>
                  <Link to={`/add/${exercise._id}`}>
                    <IoMdAddCircleOutline className="text-blue-400" />
                  </Link>
                  <Link to={`/delete/${exercise._id}`}>
                    <MdDeleteForever className="text-red-400" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
