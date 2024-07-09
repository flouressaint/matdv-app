import { useEffect, useRef, useState } from "react";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const StudyGroups = () => {
  const [studyGroups, setStudyGroups] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const effectRun = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const getStudyGroups = async () => {
      try {
        const response = await axiosPrivate.get(
          "/api/v1/teacher/study-groups",
          {
            signal,
          }
        );
        console.log(response.data);
        isMounted && setStudyGroups(response.data.items);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    if (effectRun.current) {
      getStudyGroups();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, [axiosPrivate, location, navigate]);

  return (
    <div className="flex flex-col p-5 gap-2 w-full">
      <div className="flex flex-row justify-between items-center">
        <div className="text-3xl font-bold">Учебные группы</div>
      </div>
      <div className="flex flex-col my-5 gap-2">
        {studyGroups.length === 0 ? (
          <p>Нет учебных групп</p>
        ) : (
          studyGroups.map((group) => (
            <div
              key={group.id}
              className="flex flex-row justify-between items-center border-b border-gray-200 rounded-md p-2"
            >
              <NavLink
                to={`/teacher/study-groups/${group.id}`}
                className="flex flex-col gap-2 w-full"
              >
                <div className="flex flex-row gap-2 items-center">
                  <div className="text-sm border p-2 text-wrap rounded-xl">
                    {group.category.name}
                  </div>
                  <div className="text-lg">{group.name}</div>
                </div>
                <div className="text-sm">
                  Преподаватель: {group.teacher.name}
                </div>
              </NavLink>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
