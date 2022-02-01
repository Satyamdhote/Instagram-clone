import "./App.css";
import Signup from "./components/Signup.js";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Feed from "./components/Feed";
import UploadFile from "./components/UploadFile";

function App() {
  return (
    <div className="App">
      {/* <Router>
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
      </Router> */}
      <UploadFile></UploadFile>
    </div>
  );
}

export default App;
