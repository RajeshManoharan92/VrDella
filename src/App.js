import { CRUD } from "./components/CRUD"
import './App.css';
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="crud" element={<CRUD />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
