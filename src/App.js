import "./App.css";
import Signup from "./components/Signup.js";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Feed from "./components/Feed";
import UploadFile from "./components/UploadFile";
import Like from "./components/Like";

function App() {
  return (
    <div className="App">
      {/* <Like></Like> */}
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<Signup></Signup>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Feed />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
