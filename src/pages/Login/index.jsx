import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "../../api/axios";
import { ErrorNotification } from "../../components/Notification";

const LOGIN_URL = "/api/v1/auth/login";

export const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      const token = response?.data?.token;
      const refreshToken = response?.data?.refresh_token;
      setAuth({
        username,
        token,
        refreshToken,
      });
      setUsername("");
      setPassword("");
      if (jwtDecode(token).roles.includes("ROLE_ADMIN")) {
        navigate("/admin/auditoriums");
      } else if (jwtDecode(token).roles.includes("ROLE_TEACHER")) {
        navigate("/teacher/schedule");
      } else {
        navigate("/schedule");
      }
    } catch (err) {
      console.log(err);
      if (!err?.response.data) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Неверный логин или пароль");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="w-screen min-h-svh flex flex-col">
      <div className="flex flex-row justify-around items-center p-3">
        <div className="text-sm">Дальневосточный центр математики</div>
        <NavLink
          to="/"
          className="bg-black hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded"
        >
          Главная
        </NavLink>
      </div>
      <div className="flex flex-col gap-10 items-center relative flex-grow h-full p-10 py-28 rounded-xl bg-black">
        <div className="md:w-1/4 font-bold">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="text-3xl text-center  text-white">Авторизация</div>
            <ErrorNotification message={errMsg} />
            <input
              className="border-2 border-white rounded-lg p-3"
              type="text"
              ref={usernameRef}
              placeholder="Имя пользователя"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <input
              className="border-2 border-white rounded-lg p-3"
              type="password"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button className="bg-orange-500  text-white hover:bg-orange-700 rounded-lg font-bold py-2 px-4">
              Авторизоваться
            </button>
            <NavLink
              to="/register"
              className="bg-black text-center border hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded"
            >
              Регистрация
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};
