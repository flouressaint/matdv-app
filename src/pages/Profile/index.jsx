import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../hooks/useAuth";

export const Profile = () => {
  const { auth } = useAuth();
  const token = jwtDecode(auth?.token);
  return (
    <div className="w-screen h-full flex flex-col">
      <div className="flex flex-col gap-10 items-center relative text-white flex-grow h-full p-10 py-28 rounded-xl bg-black">
        <div className="md:w-1/4 font-bold">
          <div className="text-3xl">Профиль</div>
          <div>Username: {auth.username}</div>
          Роли
          {token.roles.map((role) => (
            <div key={role}>{role}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
