import { NavLink, Outlet } from "react-router-dom";

export const SidebarTeacher = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-min lg:h-screen bg-white text-black border rounded-b-xl shadow-md dark:bg-gray-700 dark:text-white">
        <div className="flex flex-col md:m-5 lg:m-0">
          <NavLink
            to="/"
            className="flex flex-row font-semibold pt-8 pb-8 pl-14 pr-14"
          >
            <div className="pt-4 text-2xl lg:pt-1">Панель преподавателя</div>
          </NavLink>
          <ul className="flex flex-row overflow-auto lg:overflow-hidden lg:flex-col lg:pl-4 text-nowrap">
            <li className="mr-3 ml-4 lg:w-full">
              <NavLink
                to="/teacher/schedule"
                className={({ isActive }) =>
                  isActive
                    ? "inline-block lg:w-full rounded-xl text-black border-black border lg:rounded-lg py-2 px-4 lg:p-4 bg-slate-200  hover:bg-slate-200  lg:border-none dark:bg-gray-700 dark:hover:bg-slate-200 "
                    : "inline-block lg:w-full rounded-xl border-black lg:rounded-lg py-2 px-4 lg:p-4 border hover:bg-slate-200 hover:text-black lg:border-none  dark:hover:bg-slate-200 "
                }
              >
                Занятия
              </NavLink>
            </li>
            {/* <li className="mr-3 ml-4 lg:w-full">
              <NavLink
                to="/teacher/homeworks"
                className={({ isActive }) =>
                  isActive
                    ? "inline-block lg:w-full rounded-xl text-white border-black border lg:rounded-lg py-2 px-4 lg:p-4 bg-slate-700  hover:bg-slate-700  lg:border-none dark:bg-gray-700 dark:hover:bg-slate-700 "
                    : "inline-block lg:w-full rounded-xl border-black lg:rounded-lg py-2 px-4 lg:p-4 border hover:bg-slate-700 hover:text-white lg:border-none  dark:hover:bg-slate-700 "
                }
              >
                Домашние работы
              </NavLink>
            </li> */}

            <li className="mr-3 ml-4 lg:w-full">
              <NavLink
                to="/teacher/study-groups"
                className={({ isActive }) =>
                  isActive
                    ? "inline-block lg:w-full rounded-xl text-black border-black border lg:rounded-lg py-2 px-4 lg:p-4 bg-slate-200  hover:bg-slate-200  lg:border-none dark:bg-gray-700 dark:hover:bg-slate-200 "
                    : "inline-block lg:w-full rounded-xl border-black lg:rounded-lg py-2 px-4 lg:p-4 border hover:bg-slate-200 hover:text-black lg:border-none  dark:hover:bg-slate-200 "
                }
              >
                Учебные группы
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
