import "./index.css";
import Home from "./pages/Home";
import CreateTemplate from "./pages/CreateTemplate";
import { Routes, Route } from "react-router-dom";
import DeleteExercise from "./pages/DeleteExercise";
import AddExercise from "./pages/AddExercise";
import EditExercise from "./pages/EditExercise";
import DeleteTemplate from "./pages/DeleteTemplate";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateTemplate />} />
      <Route path="/edit/:id" element={<EditExercise />} />
      <Route path="/add/:id" element={<AddExercise />} />
      <Route path="/delete/:id" element={<DeleteExercise />} />
      <Route path="/deleteAll/:id" element={<DeleteTemplate />} />
    </Routes>
  );
}

export default App;
