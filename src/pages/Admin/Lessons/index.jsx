import { useEffect, useRef, useState } from "react";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { StudyGroupItem } from "../../../components/StudyGroupItem";
import { StudyGroupForm } from "../../../components/Forms/StudyGroupForm";
import { LessonItem } from "../../../components/LessonItem";
import { Timetable } from "../../../components/Timetable";

export const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const effectRun = useRef(false);

  const [errMsg, setErrMsg] = useState("");
  const [count, setCount] = useState(0);

  const addStudyGroup = async (name, teacherId, categoryId) => {
    try {
      const response = await axiosPrivate.post(
        "/api/v1/admin/studyGroup",
        JSON.stringify({ name, teacherId, categoryId }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setCount(count + 1);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Нет ответа от сервера");
      } else if (err.response?.status === 409) {
        setErrMsg("Учебная группа с таким именем уже существует");
      } else if (err.response?.status === 401) {
        setErrMsg("Недостаточно прав");
      } else {
        setErrMsg("Не удалось добавить учебную группу");
      }
    }
  };

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

    if (effectRun.current) {
      getLessons();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, [count, axiosPrivate, location, navigate]);

  return (
    <div className="flex flex-col p-5 gap-2 bg-slate-600 w-full text-white">
      <button
        onClick={() => navigate("/admin/lesson/create")}
        className="bg-slate-800 flex flex-row gap-2 text-white hover:bg-zinc-700 w-1/2 lg:w-2/5 py-4 px-4 rounded-xl"
      >
        Создать занятие
      </button>
      <h1 className="text-red-500">{errMsg}</h1>
      <div className="flex flex-col my-5 gap-5">
        {lessons.length === 0 ? (
          <p>Нет учебных групп</p>
        ) : (
          <Timetable lessons={lessons} />
        )}
      </div>
    </div>
  );
};
