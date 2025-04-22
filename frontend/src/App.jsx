import './index.css'
import Home from './pages/Home'
import CreateExercise from './pages/CreateExercise';
import {Routes, Route} from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [exercise, setExercise] = useState([]);

  return (
    <Routes>
      <Route path='/' element={<Home exercise={exercise}/>}/>
      <Route path='/create' element={<CreateExercise exercise={exercise} setExercise={setExercise}/>}/>
    </Routes>
  )
}

export default App
