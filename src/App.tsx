import Login from "./components/auth/login";
import Welcome from "./components/welcome";
import { Routes, Route } from "react-router-dom";
import "./app.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="welcome" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;
