import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { LoginType } from "../../types/interface";
import { auth } from "../../firebase";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../app/hooks";
import { saveUser } from "../../features/auth/authSlice";

const Login: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (user: LoginType) => {
    try {
      setLoading(true);
      const authUser = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const userData = {
        displayName: authUser.user.displayName,
        email: authUser.user.email,
        token: authUser.user.refreshToken,
        userId: authUser.user.uid,
      };
      dispatch(saveUser(userData));
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-group">
            <label className="label-email">Email</label>
            <input
              type="email"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          <div className="form-group">
            <label className="label-password">Password</label>
            <input
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              {loading ? "Processing..." : "Login"}
            </button>
          </div>
        </form>

        <p>
          Doen't already have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
