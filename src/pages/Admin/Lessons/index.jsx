import { useEffect, useRef, useState } from "react";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { LessonItem } from "../../../components/LessonItem.jsx";
import { ModalCreateLesson } from "../../../components/Modals/ModalCreateLesson.jsx";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const effectRun = useRef(false);
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [count, setCount] = useState(0);

  const [errMsg, setErrMsg] = useState("");

  const now = new Date();
  const [startDate, setStartDate] = useState(
    new Date(now.setDate(now.getDate() - now.getDay()))
  );
  const days = [];
  let date = new Date(startDate);
  for (let i = 0; i < 6; i++) {
    days.push(new Date(date.setDate(date.getDate() + 1)));
  }

  const [lesson, setLesson] = useState({
    date: "",
    startTime: "10:00",
    endTime: "11:00",
    auditorium: {
      id: "",
      name: "",
    },
    studyGroup: {
      id: "",
      name: "",
    },
  });

  const deleteLesson = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/api/v1/admin/lesson/${id}`);
      console.log(response.data);
      setCount(count + 1);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Нет ответа от сервера");
      } else if (err.response?.status === 401) {
        setErrMsg("Недостаточно прав");
      } else {
        setErrMsg("Не удалось удалить аудиторию");
      }
    }
  };

  const [auditoriums, setAuditoriums] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const getLessons = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/admin/lessons", {
          signal,
        });
        console.log(response.data);
        isMounted && setLessons(response.data.items);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const getAuditoriums = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/admin/auditoriums", {
          signal,
        });
        console.log(response.data);
        isMounted && setAuditoriums(response.data.items);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const getStudyGroups = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/admin/studyGroups", {
          signal,
        });
        console.log(response.data);
        isMounted && setStudyGroups(response.data.items);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    if (effectRun.current) {
      getLessons();
      getAuditoriums();
      getStudyGroups();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, [count, axiosPrivate, location, navigate]);

  return (
    <div className="flex flex-col p-5 gap-2 bg-slate-600 w-full text-white">
      <div className="flex flex-col mb-5 gap-5">
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 flex-row">
              <div className="text-3xl font-bold">Расписание занятий</div>
              <div>{errMsg}</div>
              <button
                onClick={() => {
                  let date = new Date(startDate);
                  setStartDate(date.setDate(date.getDate() - 7));
                }}
                className="bg-slate-500 p-2 rounded-lg hover:bg-slate-400"
              >
                <ArrowLeftIcon className="size-6" />
              </button>
              <button
                onClick={() => {
                  let date = new Date(startDate);
                  setStartDate(date.setDate(date.getDate() + 7));
                }}
                className="bg-slate-500 p-2 rounded-lg hover:bg-slate-400"
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
                  <button
                    onClick={() => {
                      setLesson({
                        ...lesson,
                        date: day
                          .toLocaleDateString("ru-RU")
                          .split("T")[0]
                          .split(".")
                          .reverse()
                          .join("-"),
                      });
                      setCreateIsOpen(!createIsOpen);
                    }}
                    className=" text-base bg-slate-500 p-2 rounded-lg hover:bg-slate-400"
                  >
                    <PlusCircleIcon className="size-6" />
                  </button>
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
                      <LessonItem
                        key={lesson.id}
                        lesson={lesson}
                        deleteLesson={deleteLesson}
                        auditoriums={auditoriums}
                        studyGroups={studyGroups}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
          <ModalCreateLesson
            lesson={lesson}
            setLesson={setLesson}
            isOpen={createIsOpen}
            setIsOpen={setCreateIsOpen}
          />
        </div>
      </div>
    </div>
  );
};
