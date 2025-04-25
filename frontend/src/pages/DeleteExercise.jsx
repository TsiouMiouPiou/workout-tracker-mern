import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import BackButton from './components/BackButton'
import { MdDisabledVisible } from 'react-icons/md';

const DeleteExercise = () => {
    const navigate = useNavigate();
    const { id } = useParams();

const handleDeleteExercises = () => {
    axios
         .delete(`http://localhost:5000/exercises/${id}`)
         .then(() => {
            navigate('/');
         })
         .catch((error) => {
            console.log(error);
            alert("There is an error");
         })
        
}
  return (
    <>
    <div className='text-5xl cursor-pointer'>
      <BackButton/>
    </div>
    <div>
        
    </div>
    </>
  )
}

export default DeleteExercise