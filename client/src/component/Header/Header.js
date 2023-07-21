import { useNavigate } from "react-router-dom";
import './Header.css'

const Header = () => {
  let tmpData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <span className="title">ToDoList's {tmpData?.username?.toUpperCase()}</span>
      <button className="logout-button" onClick={() => {navigate('/'); window.localStorage.clear()}}>↪</button>
    </div>
  );
};

export default Header;
