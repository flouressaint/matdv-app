import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { NavLink, Outlet } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <div className="flex flex-row justify-around items-center p-3 rounded-xl shadow-md">
        <NavLink className="text-sm">Дальневосточный центр математики</NavLink>
        <div className="flex flex-row gap-2 items-center">
          <NavLink
            to="/profile"
            className="hover:bg-zinc-300 text-white font-bold p-2 rounded-xl"
          >
            <UserCircleIcon className="size-8 text-black" />
          </NavLink>
          <button
            className=" hover:bg-zinc-300 text-white font-bold p-2 rounded-xl"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            <ArrowRightStartOnRectangleIcon className="size-8 text-black" />
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
