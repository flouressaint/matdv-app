import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const FULLNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
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
        setErrMsg("Usernamename Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">
              Фамилия Имя:
              {/* <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !username ? "hide" : "invalid"}
              /> */}
            </label>
            <input
              type="text"
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
                  ? "instructions"
                  : "offscreen"
              }
            >
              {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
              Введите ваше Фамилию Имя через пробел.
            </p>

            <label htmlFor="usernamename">
              Имя пользователя:
              {/* <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !username ? "hide" : "invalid"}
              /> */}
            </label>
            <input
              type="text"
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
                usernameFocus && username && !validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">
              Password:
              {/* <FontAwesomeIcon
                icon={faCheck}
                className={validPassword ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPassword || !password ? "hide" : "invalid"}
              /> */}
            </label>
            <input
              type="password"
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
                passwordFocus && !validPassword ? "instructions" : "hide"
              }
            >
              {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_password">
              Confirm Password:
              {/* <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && confirmPassword ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !confirmPassword ? "hide" : "invalid"}
              /> */}
            </label>
            <input
              type="password"
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
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
              Must match the first password input field.
            </p>

            <button
              disabled={
                !validName || !validPassword || !validMatch ? true : false
              }
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};
