import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  doc,
  getFirestore,
  setDoc,
  collection as liteCollection,
} from "firebase/firestore/lite";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { RegisterUserType } from "../../types/interface";
import { auth, db, firebaseApp } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

import "./login.css";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const RegisterUser: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    phonenumber: Yup.string().required("Phone number is required"),
    dateofbirth: Yup.date().required("Date of birth is required"),
    country: Yup.string().required("Country is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUserType>({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const handleRegisterSubmit = async (user: RegisterUserType) => {
    // create user in the firebase with email, password and display name;
    try {
      setLoading(true);
      const userAuth = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      // get current user
      const currentUser = auth.currentUser;
      let countriesSubcollection: any;
      const userData: RegisterUserType = {
        ...user,

        createdAt: new Date().toISOString(),
        logindate: new Date().toISOString(),
      };
      // update user profile
      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: user.firstname,
        });
        countriesSubcollection = collection(
          db,
          "countries",
          currentUser.uid,
          "country"
        );
      }

      const database = getFirestore(firebaseApp);
      const userRef = liteCollection(database, "users");
      await setDoc(doc(userRef, userAuth.user.uid), userData);

      const result = await axios.get("https://restcountries.com/v3.1/all");

      if (result.data) {
        toast.warning(
          "Please wait while we are adding your country to the database"
        );
        for (let i = 0; i < result.data.length; i++) {
          const card = result.data[i];
          await addDoc(countriesSubcollection, {
            name: card.name.common,
            capital: card.capital || "",
            currencies: card.currencies || "",
            population: card.population || "",
            borders: card.borders || "",
            region: card.region || "",
            subregion: card.subregion || "",
            languages: card.languages || "",
            flags: card.flags,
            isVisited: false,
          });
        }
      }
      reset();
      toast.success("You have successfully registered, please login");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit(handleRegisterSubmit)}>
          <div className="form-group">
            <label className="label">First Name</label>
            <input
              type="text"
              {...register("firstname")}
              className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.firstname?.message}</div>
          </div>
          <div className="form-group">
            <label className="label">Last Name</label>
            <input
              type="text"
              {...register("lastname")}
              className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.lastname?.message}</div>
          </div>
          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          <div className="form-group">
            <label className="label">Phone Number</label>
            <input
              type="text"
              {...register("phonenumber")}
              className={`form-control ${
                errors.phonenumber ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.phonenumber?.message}
            </div>
          </div>
          <div className="form-group">
            <label className="label">Date of Birth</label>
            <input
              type="date"
              {...register("dateofbirth")}
              className={`form-control ${
                errors.dateofbirth ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.dateofbirth?.message}
            </div>
          </div>
          <div className="form-group">
            <label className="label">Country</label>
            <input
              type="text"
              {...register("country")}
              className={`form-control ${errors.country ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.country?.message}</div>
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="form-group">
            <button className="btn btn-primary">
              {loading ? "Processing..." : "Register"}
            </button>
          </div>
        </form>
        <p>
          Do you already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
