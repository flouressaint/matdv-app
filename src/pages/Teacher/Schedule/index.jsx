import { useEffect, useRef, useState } from "react";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { TeacherLessonItem } from "../../../components/TeacherLessonItem.jsx";

export const Schedule = () => {
  const [lessons, setLessons] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const effectRun = useRef(false);

  const now = new Date();
  const [startDate, setStartDate] = useState(
    new Date(now.setDate(now.getDate() - now.getDay()))
  );
  const days = [];
  let date = new Date(startDate);
  for (let i = 0; i < 6; i++) {
    days.push(new Date(date.setDate(date.getDate() + 1)));
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const getLessons = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/teacher/lessons", {
          signal,
        });
        console.log(response.data);
        isMounted && setLessons(response.data.items);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    if (effectRun.current) {
      getLessons();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, [axiosPrivate, location, navigate]);

  if (lessons.length === 0) {
    return (
      <div className="flex relative flex-grow flex-col p-5 gap-2 bg-slate-600 w-full text-white">
        <div className="flex flex-col mb-5 gap-5">
          <div className="w-full">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 flex-row">
                <div className="text-3xl font-bold">Расписание</div>
                <button
                  onClick={() => {
                    let date = new Date(startDate);
                    setStartDate(date.setDate(date.getDate() - 7));
                  }}
                >
                  <ArrowLeftIcon className="size-6" />
                </button>
                <button
                  onClick={() => {
                    let date = new Date(startDate);
                    setStartDate(date.setDate(date.getDate() + 7));
                  }}
                >
                  <ArrowRightIcon className="size-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-3xl font-bold">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="flex relative flex-grow flex-col p-5 gap-2 bg-slate-600 w-full text-white">
      <div className="flex flex-col mb-5 gap-5">
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 flex-row">
              <div className="text-3xl font-bold">Расписание</div>
              <button
                onClick={() => {
                  let date = new Date(startDate);
                  setStartDate(date.setDate(date.getDate() - 7));
                }}
              >
                <ArrowLeftIcon className="size-6" />
              </button>
              <button
                onClick={() => {
                  let date = new Date(startDate);
                  setStartDate(date.setDate(date.getDate() + 7));
                }}
              >
                <ArrowRightIcon className="size-6" />
              </button>
            </div>
            {days.map((day) => (
              <div
                key={day.getDate()}
                className="flex flex-col gap-1 border-b p-3 border-zinc-200 dark:border-zinc-700"
              >
                <div className="flex flex-row items-center gap-2 text-lg font-bold">
                  <div>
                    {day.toLocaleDateString("ru-RU", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </div>
                </div>
                <div className="flex flex-row gap-1 flex-wrap">
                  {lessons
                    .filter(
                      (lesson) =>
                        lesson.date ==
                        day
                          .toLocaleDateString("ru-RU")
                          .split("T")[0]
                          .split(".")
                          .reverse()
                          .join("-")
                    )
                    .map((lesson) => (
                      <TeacherLessonItem key={lesson.id} lesson={lesson} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
