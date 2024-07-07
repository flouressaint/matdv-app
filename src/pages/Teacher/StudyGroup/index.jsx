import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useEffect, useRef, useState } from "react";

export const StudyGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [studyGroup, setStudyGroup] = useState(null);
  const [lessons, setLessons] = useState([]);
  const effectRun = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const getLessons = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/v1/teacher/study-group/${id}/lessons`,
          {
            signal,
          }
        );
        isMounted && setLessons(response.data.items);
        console.log(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const getStudyGroup = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/v1/teacher/studyGroup/${id}`,
          {
            signal,
          }
        );
        isMounted && setStudyGroup(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    if (effectRun.current) {
      getStudyGroup();
      getLessons();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, [id, axiosPrivate, navigate, location]);

  if (!studyGroup) {
    return (
      <div className="flex bg-slate-600 w-full h-screen text-white">
        <div className="m-auto border rounded-lg p-10">
          <h3>Загрузка...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-600 w-full h-screen text-white p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(lessons);
        }}
      >
        <div className="flex flex-col gap-2 h-full">
          <div className="flex flex-row justify-between">
            <button
              onClick={() => navigate("/teacher/study-groups")}
              className="bg-slate-800 flex flex-row gap-2 text-white hover:bg-zinc-700 w-2/3 lg:w-2/5 py-4 px-4 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              Вернуться к списку групп
            </button>
            <div className=" px-4 py-3 rounded-xl sm:flex sm:flex-row-reverse sm:px-6">
              <input
                type="submit"
                value="Сохранить"
                onClick={() => alert("saved")}
                className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 sm:ml-3 sm:w-auto"
              />
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Отмена
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center border-b  border-gray-500 rounded-md p-2">
            <div className="flex flex-row gap-2 items-center">
              <div className="text-sm border p-2 text-wrap rounded-xl">
                {studyGroup.category.name}
              </div>
              <div className="text-lg font-bold">{studyGroup.name}</div>
            </div>
            <div className="text-sm">
              Преподаватель: {studyGroup.teacher.name}
            </div>
          </div>

          <table className="bg-black/10 rounded-xl">
            <tbody>
              <tr>
                <th className="sticky">Ученик</th>
                {lessons.map((lesson) => (
                  <th key={lesson.id} className="text-xs">
                    {new Date(lesson.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                    })}
                    <br />
                    {lesson.startTime}-{lesson.endTime}
                    <br />
                    {lesson.hometask &&
                      "Макс.Балл: " + lesson.hometask.maxScore}
                  </th>
                ))}
                <th className="text-xs">Баллы</th>
              </tr>
              {studyGroup.students.map((student) => (
                <tr key={student.id}>
                  <td className="flex flex-row justify-between items-center border-b  border-gray-500 hover:bg-gray-500 rounded-md p-2">
                    <div className="text-sm font-bold">{student.name}</div>
                  </td>
                  {lessons.map((lesson) => (
                    <td key={"1" + lesson.id} className="items-center">
                      <input
                        type="number"
                        className="w-full text-center resize-none rounded-lg bg-white/5 py-1.5 px-3 text-sm/6 text-white
                      focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      />
                    </td>
                  ))}
                  <td className="text-xs text-center resize-none rounded-lg bg-white/20 py-1.5 px-3 text-white ">
                    ff
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};
