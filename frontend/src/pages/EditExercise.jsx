import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from './components/BackButton';

const EditExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [template, setTemplate] = useState('');
  const [exercises, setExercises] = useState([]);
  const [current, setCurrent] = useState(null);
  const [newExercise, setNewExercise] = useState('');
  const [newTemplate, setNewTemplate] = useState();

  // Load from database
  useEffect(() => {
    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then((res) => {
        setTemplate(res.data.data.template);
        setExercises(res.data.data.exercises);
      })
      .catch((error) => {
        alert('There is an error!');
        console.log(error);
      });
  }, []);

  // Handle editing exercise
  const handleEditClick = (index) => {
    setCurrent(index);
    setNewExercise(exercises[index]);
  };

  // Handle template change
  const handleTemplateSave = () => {
    if (!newTemplate.trim()) return;
    setTemplate(newTemplate);
  };

  // Save changes
  const handleSave = () => {
    if (current === null || !newExercise.trim()) return;

    const updatedExercises = [...exercises];
    updatedExercises[current] = newExercise;

    const newData = {
      template,
      exercises: updatedExercises,
    };

    axios
      .put(`http://localhost:5000/exercises/${id}`, newData)
      .then(() => {
        alert('Exercise has been successfully saved');
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <BackButton />
      </div>
      <div className="max-w-xl mx-auto p-6 mt-8 bg-white shadow-2xl rounded-xl">
        <h1 className="text-center text-3xl text-amber-400">Edit Template: {template}</h1>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Edit New Template..."
            className="border-2 border-gray-300 rounded-xl px-4 py-2 w-full"
            value={newTemplate}
            onChange={(e) => setNewTemplate(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-xl w-full cursor-pointer"
            onClick={handleTemplateSave}
          >
            Save Template
          </button>
        </div>

        <ul className="mt-6">
          {exercises.map((ex, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <span className="text-xl">{index + 1}. {ex}</span>
              <button
                className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-xl"
                onClick={() => handleEditClick(index)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>

        {current !== null && (
          <div className="mt-6">
            <h2 className="text-2xl mb-2">Edit Exercise</h2>
            <input
              type="text"
              className="border-2 border-black rounded-xl px-3 py-2 w-full mb-4"
              value={newExercise}
              onChange={(e) => setNewExercise(e.target.value)}
            />
            <button
              className="border-2 border-green-500 bg-green-300 hover:bg-green-400 rounded-xl py-2 w-full cursor-pointer"
              onClick={handleSave}
            >
              Save Exercise
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EditExercise;
