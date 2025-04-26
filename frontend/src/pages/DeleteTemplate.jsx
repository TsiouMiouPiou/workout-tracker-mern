import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "./components/BackButton";

const DeleteTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState("");
  const [exercises, setExercises] = useState([]);

  const handleDeletetion = () => {
    const data = {
      template,
      exercises,
    };
    axios
      .delete(`http://localhost:5000/exercises/${id}`, data)
      .then((res) => {
        setTemplate(res.data.data);
        setExercises(res.data.data);
        alert("Template has been deleted");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
    <BackButton />
    <div className="flex justify-center ">
      <button
        className="cursor-pointer  text-3xl bg-red-600 mt-10 p-5 rounded-2xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
        onClick={handleDeletetion}
      >
        Delete Template
      </button>
    </div>
    </>
  );
};


export default DeleteTemplate;
