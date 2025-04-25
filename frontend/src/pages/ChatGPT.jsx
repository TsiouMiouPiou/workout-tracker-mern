import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState('');
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [newExercise, setNewExercise] = useState('');

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
  }, [id]);

  const handleEditClick = (index) => {
    setCurrentIndex(index);
    setNewExercise(exercises[index]);
  };

  const handleSave = () => {
    if (currentIndex === null || !newExercise.trim()) return;

    const updatedExercises = [...exercises];
    updatedExercises[currentIndex] = newExercise;

    const updatedData = {
      template,
      exercises: updatedExercises,
    };

    axios
      .put(`http://localhost:5000/exercises/${id}`, updatedData)
      .then(() => {
        alert('Exercise updated successfully!');
        navigate('/');
      })
      .catch((error) => {
        alert('Failed to update exercise.');
        console.log(error);
      });
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-4">Edit Template: {template}</h1>

      <ul className="mb-4 space-y-2">
        {exercises.map((ex, index) => (
          <li key={index} className="flex justify-between items-center border p-2 rounded-lg">
            <span>{ex}</span>
            <button
              onClick={() => handleEditClick(index)}
              className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {currentIndex !== null && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-2">Edit Exercise</h2>
          <input
            type="text"
            className="w-full border rounded p-2 mb-3"
            value={newExercise}
            onChange={(e) => setNewExercise(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditExercise;
