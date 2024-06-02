import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="lg:w-min lg:h-lvh bg-zinc-100 dark:bg-zinc-700 dark:text-white">
      <div className="flex flex-col lg:mb-5">
        <NavLink
          to="/"
          className="flex flex-row font-semibold pt-8 pb-8 pl-14 pr-14"
        >
          <div className="pt-4 text-2xl lg:pt-1">Панель администратора</div>
        </NavLink>
        <ul className="flex flex-row overflow-auto pb-6 lg:overflow-hidden lg:flex-col lg:pl-4 text-nowrap">
          <li className="mr-3 ml-4 lg:w-full">
            <NavLink
              to="/admin/auditoriums"
              className={({ isActive }) =>
                isActive
                  ? "inline-block lg:w-full rounded lg:rounded-lg py-2 px-4 lg:p-4 bg-violet-200 hover:bg-violet-200 dark:bg-violet-700 dark:hover:bg-violet-600"
                  : "inline-block lg:w-full rounded lg:rounded-lg py-2 px-4 lg:p-4 hover:bg-violet-200 dark:hover:bg-violet-600"
              }
            >
              Аудитории
            </NavLink>
          </li>
          <li className="mr-3 ml-4 lg:w-full">
            <NavLink
              to="/admin/study-group-categories"
              className={({ isActive }) =>
                isActive
                  ? "inline-block lg:w-full rounded lg:rounded-lg py-2 px-4 lg:p-4 bg-violet-200 hover:bg-violet-200 dark:bg-violet-700 dark:hover:bg-violet-600"
                  : "inline-block lg:w-full rounded lg:rounded-lg py-2 px-4 lg:p-4 hover:bg-violet-200 dark:hover:bg-violet-600"
              }
            >
              Категории учебных групп
            </NavLink>
          </li>
          <li className="mr-3 ml-4 lg:w-full">
            <NavLink
              to="/admin/teachers"
              className={({ isActive }) =>
                isActive
                  ? "inline-block lg:w-full rounded lg:rounded-lg py-2 px-4 lg:p-4 bg-violet-200 hover:bg-violet-200 dark:bg-violet-700 dark:hover:bg-violet-600"
                  : "inline-block lg:w-full rounded lg:rounded-lg py-2 px-4 lg:p-4 hover:bg-violet-200 dark:hover:bg-violet-600"
              }
            >
              Преподаватели
            </NavLink>
          </li>
          <li className="mr-3 ml-4 lg:w-full">
            <NavLink
              to="/admin/study-groups"
              className={({ isActive }) =>
                isActive
                  ? "inline-block lg:w-full rounded lg:rounded-lg py-2 px-4 lg:p-4 bg-violet-200 hover:bg-violet-200 dark:bg-violet-700 dark:hover:bg-violet-600"
                  : "inline-block lg:w-full rounded lg:rounded-lg py-2 px-4 lg:p-4 hover:bg-violet-200 dark:hover:bg-violet-600"
              }
            >
              Учебные группы
            </NavLink>
          </li>
          <li className="mr-3 ml-4 lg:w-full">
            <NavLink
              to="/admin/lessons"
              className={({ isActive }) =>
                isActive
                  ? "inline-block lg:w-full rounded lg:rounded-lg py-2 px-4 lg:p-4 bg-violet-200 hover:bg-violet-200 dark:bg-violet-700 dark:hover:bg-violet-600"
                  : "inline-block lg:w-full rounded lg:rounded-lg py-2 px-4 lg:p-4 hover:bg-violet-200 dark:hover:bg-violet-600"
              }
            >
              Занятия
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
