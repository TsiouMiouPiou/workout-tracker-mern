import axios from "axios";
import { Link } from "react-router-dom";
import { HiArrowNarrowDown } from "react-icons/hi";
import { useEffect, useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
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
      <div className="text-center mt-10">
        <h1 className="text-6xl font-bold text-blue-600 mb-4 drop-shadow-lg">
          Tsiou GYM
        </h1>
        <Link to={"/create"}>
          <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-full text-xl hover:bg-blue-600 transition">
            Create New Template
          </button>
        </Link>
      </div>

      <div className="flex justify-center my-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 min-w-4xl px-6">
          {exercises.map((exercise) => (
            <div
              key={exercise._id}
              className="border-2 border-gray-300 shadow-xl rounded-3xl p-6 hover:scale-105 hover:shadow-2xl transition duration-300 bg-white"
            >
              <h1 className="text-3xl text-green-500 font-bold text-center mb-4">
                {exercise.template}
              </h1>
              <div className="flex justify-center mb-4">
                <Link to={`deleteAll/${exercise._id}`} className="text-4xl">
                  <FcDeleteDatabase />
                </Link>
              </div>
              <ol className="text-lg text-gray-700 my-4 max-h-48 overflow-y-auto pr-3">
                {exercise.exercises.map((name, index) => (
                  <li
                    key={index}
                    className="flex justify-between py-1 border-b"
                  >
                    <span>
                      {index + 1}. {name}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="flex justify-center gap-6 text-3xl pt-6">
                <Link to={`/edit/${exercise._id}`}>
                  <MdEdit className="text-gray-500 hover:text-gray-700 transition" />
                </Link>
                <Link to={`/add/${exercise._id}`}>
                  <IoMdAddCircleOutline className="text-blue-400 hover:text-blue-600 transition" />
                </Link>
                <Link to={`/delete/${exercise._id}`}>
                  <MdDeleteForever className="text-red-400 hover:text-red-600 transition" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
