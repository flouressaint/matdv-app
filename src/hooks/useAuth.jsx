import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context/AuthProvider";

export const useAuth = () => {
  const { auth } = useContext(AuthContext);
  localStorage.setItem("auth", JSON.stringify(auth));
  useDebugValue(auth, (auth) => (auth?.username ? "Logged In" : "Logged Out"));
  return useContext(AuthContext);
};
