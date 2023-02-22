import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Form from "./Components/Form/Form";
import Profile from "./Components/Profile/Profile";
import Registration from "./Components/Registration/Registration";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/login" element={<Form />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/me" element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
