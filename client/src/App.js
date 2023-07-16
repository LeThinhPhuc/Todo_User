import './App.css';
import { Routes, Route } from "react-router-dom";
import Main from './component/Main/Main';
import Login from './component/Login/Login';
import Register from './component/Register/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/task" element={<Main />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
