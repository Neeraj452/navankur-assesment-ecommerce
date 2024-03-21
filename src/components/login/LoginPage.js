import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./loginPage.module.css";
import { logAction } from "../../store/login/login";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "eve.holt@reqres.in",
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  });
  const [validation, setValidation] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const data = useSelector((state) => state?.loginReducer);

  useEffect(() => {
    if (token) {
      navigate("/products");
    }
  }, [token, navigate]);

  const handleLogin = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      setValidation(true);
      return;
    }
    dispatch(logAction(formData, navigate));
  };

  return (
    <>
      {data?.isLoading && <Loading />}
      <div className={style.login_container}>
        <h2 className={style.heading}>Login</h2>
        <div className={style.login_card}>
          <p>Name</p>
          <input
            type="text"
            placeholder="Name"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className={style.login_input}
          />
          <div
            className={
              !formData?.username && validation
                ? style.error_message
                : style.success_message
            }
          >
            Please Enter Name
          </div>

          <p>Email</p>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={style.login_input}
          />
          <div
            className={
              !formData?.email && validation
                ? style.error_message
                : style.success_message
            }
          >
            {"Please Enter Email"}
          </div>
          <p>Password</p>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className={style.login_input}
          />
          <div
            className={
              !formData?.password && validation
                ? style.error_message
                : style.success_message
            }
          >
            Please Enter Password
          </div>
          <button onClick={handleLogin} className={style.login_button}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
