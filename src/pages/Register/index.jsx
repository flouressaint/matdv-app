import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import { NavLink } from "react-router-dom";
import { ErrorNotification } from "../../components/Notification";

const FULLNAME_REGEX = /^[А-Я][а-я]{2,23}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const REGISTER_URL = "/api/v1/auth/signUp";

export const Register = () => {
  const usernameRef = useRef();
  const errRef = useRef();

  const [fullName, setFullname] = useState("");
  const [validFullname, setValidFullname] = useState(false);
  const [fullNameFocus, setFullnameFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    // TODO: change regex
    setValidFullname(FULLNAME_REGEX.test(fullName));
  }, [fullName]);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [fullName, username, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ fullName, username, password, confirmPassword }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      setFullname("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Учетная запись уже существует в системе");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="w-screen min-h-svh flex flex-col">
      <div className="flex flex-row justify-around items-center p-3">
        <div className="text-sm">Дальневосточный центр математики</div>
        <NavLink
          to="/login"
          className="bg-black hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded"
        >
          Авторизация
        </NavLink>
      </div>
      <div className="flex flex-col gap-10 items-center relative flex-grow p-10 py-28 rounded-xl bg-black text-white">
        <div className="md:w-1/4 font-bold">
          {success ? (
            <div className="flex flex-col items-center gap-5">
              <div className="text-3xl text-center">
                Вы успешно зарегистрировались!
              </div>
              <NavLink
                to="/login"
                className="bg-orange-500 text-center hover:bg-orange-700 rounded-lg font-bold py-2 px-4 disabled:bg-slate-600"
              >
                Авторизоваться
              </NavLink>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="text-3xl text-center">Регистрация</div>
              <ErrorNotification message={errMsg} />
              <input
                type="text"
                placeholder="Фамилия"
                className="border-2 border-white text-black rounded-lg p-3"
                id="fullName"
                ref={usernameRef}
                autoComplete="off"
                onChange={(e) => setFullname(e.target.value)}
                value={fullName}
                required
                aria-invalid={validFullname ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setFullnameFocus(true)}
                onBlur={() => setFullnameFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  fullNameFocus && fullName && !validFullname
                    ? "text-sm"
                    : "hidden"
                }
              >
                Введите вашу Фамилию с большой буквы.
              </p>

              <input
                type="text"
                placeholder="Имя пользователя"
                className="border-2 border-white text-black rounded-lg p-3"
                id="usernamename"
                ref={usernameRef}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  usernameFocus && username && !validName ? "text-sm" : "hidden"
                }
              >
                От 4 до 24 символов.
                <br />
                Должен начинаться с буквы.
                <br />
                Можно использовать только латинские буквы, цифры, подчёркивания.
              </p>

              <input
                type="password"
                className="border-2 border-white text-black rounded-lg p-3"
                placeholder="Пароль"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="passwordnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <p
                id="passwordnote"
                className={
                  passwordFocus && !validPassword ? "text-sm" : "hidden"
                }
              >
                {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                8 или более символов.
                <br />
                Должен содержать заглавные и строчные буквы, цифру.
                <br />
              </p>

              <input
                className="border-2 border-white text-black rounded-lg p-3"
                type="password"
                placeholder="Подтвердите пароль"
                id="confirm_password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={matchFocus && !validMatch ? "text-sm" : "hidden"}
              >
                Должно совпадать с первым полем ввода пароля.
              </p>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 rounded-lg font-bold py-2 px-4 disabled:bg-slate-600"
                disabled={
                  !validName || !validPassword || !validMatch ? true : false
                }
              >
                Зарегистрироваться
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
