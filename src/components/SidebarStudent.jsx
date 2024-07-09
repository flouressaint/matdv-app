import { NavLink, Outlet } from "react-router-dom";

export const SidebarStudent = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-min lg:h-screen bg-white text-black border rounded-b-xl shadow-md dark:bg-gray-700 dark:text-white">
        <div className="flex flex-col md:m-5 lg:m-0">
          <ul className="flex flex-row overflow-auto lg:overflow-hidden lg:flex-col lg:pl-4 text-nowrap">
            <li className="mr-3 ml-4 lg:w-full">
              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  isActive
                    ? "inline-block lg:w-full rounded-xl text-black border-black border lg:rounded-lg py-2 px-4 lg:p-4 bg-slate-200  hover:bg-slate-200  lg:border-none dark:bg-gray-700 dark:hover:bg-slate-200 "
                    : "inline-block lg:w-full rounded-xl border-black lg:rounded-lg py-2 px-4 lg:p-4 border hover:bg-slate-200 hover:text-black lg:border-none  dark:hover:bg-slate-200 "
                }
              >
                Дневник
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
