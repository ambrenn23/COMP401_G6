import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Register</Link> | <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
