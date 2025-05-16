
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { AddTask } from "./components/AddTask";
import { useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);


  return (
    <BrowserRouter>
    <div className="container">
      <Header
        title="Tehtävälista"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />

      <Routes>
        <Route path="/" element= {
          <>
      {showAddTask &&
        <AddTask  />
      }
      <Tasks />
      </>
      }
       />

       <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />} />
       <Route path="/logout" element={<Logout />} />

      </Routes>
    </div>
    </BrowserRouter>


  );
}

export default App;
