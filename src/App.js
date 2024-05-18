import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Auth } from "./pages/auth/login";
import { MoneyMinder } from "./pages/money-minder";
import Signup from "./pages/signup/Signup"; // Import Signup component

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" exact element={<Auth />}/>
        <Route path="/signup" exact element={<Signup />}/> {/* Use Signup component */}
        <Route path="/money-minder" element={<MoneyMinder />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
