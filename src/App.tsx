import "./App.css";
import Login from "./components/userauth/Login";
import Home from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { saveUser } from "./features/auth/authSlice";
import Detail from "./components/details/Detail";
import Register from "./components/userauth/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import { auth } from "./firebase";
import Visited from "./components/visited/Visited";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          token: user.refreshToken,
          userId: user.uid,
        };
        dispatch(saveUser(userData));
      } else {
        signOut(auth).then(() => {
          navigate("/login");
        });
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />

        <Route
          path="/visited"
          element={<ProtectedRoute component={Visited} />}
        />
        <Route
          path="/details/:id"
          element={<ProtectedRoute component={Detail} />}
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
