import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Users from "./pages/Users/Users";
import Dashboard from "./pages/Dashboard/Dashboard";
import Organization from "./pages/Organization/Organization";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route element={<PrivateRoutes/>}> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/organization" element={<Organization />} />

          {/* </Route> */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
