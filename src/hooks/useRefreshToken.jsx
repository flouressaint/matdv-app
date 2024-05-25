import axios from "../api/axios";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/api/v1/auth/refresh",
      JSON.stringify({ refresh_token: auth?.refreshToken }),
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.token);
      return {
        ...prev,
        token: response.data.token,
        refreshToken: response.data.refresh_token,
      };
    });
    return response.data.token;
  };
  return refresh;
};
