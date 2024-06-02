import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { MyCombobox } from "../../../components/MyComboBox";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../components/Notification";

export const CreateLesson = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const effectRun = useRef(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [auditoriums, setAuditoriums] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);

  const [lesson, setLesson] = useState({
    date: "",
    startTime: "",
    endTime: "",
    auditorium: {
      id: "",
      name: "",
    },
    studyGroup: {
      id: "",
      name: "",
    },
  });

  const createLesson = async (lesson) => {
    try {
      const response = await axiosPrivate.post(
        "/api/v1/admin/lesson",
        JSON.stringify({
          date: lesson.date,
          startTime: lesson.startTime,
          endTime: lesson.endTime,
          auditoriumId: lesson.auditorium.id,
          studyGroupId: lesson.studyGroup.id,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      // setLesson({
      //   date: "",
      //   startTime: "",
      //   endTime: "",
      //   auditorium: {
      //     id: "",
      //     name: "",
      //   },
      //   studyGroup: {
      //     id: "",
      //     name: "",
      //   },
      // });
      setSuccessMsg("Занятие создано");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Нет ответа от сервера");
      } else if (err.response?.status === 400) {
        setErrMsg(err.response.data.message);
      } else if (err.response?.status === 401) {
        setErrMsg("Недостаточно прав");
      } else {
        setErrMsg("Не удалось добавить занятие");
      }
    }
  };

  useEffect(() => {
    setErrMsg("");
    setSuccessMsg("");
  }, [lesson]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

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
      getAuditoriums();
      getStudyGroups();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, [axiosPrivate, location, navigate]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createLesson(lesson);
      }}
      className="flex flex-col p-5 gap-2 bg-slate-600 w-full text-white"
    >
      <SuccessNotification message={successMsg} />
      <ErrorNotification message={errMsg} />
      <div className="text-xl">Создание урока</div>
      <label>Дата проведения</label>
      <input
        type="date"
        value={lesson.date}
        onChange={(e) => setLesson({ ...lesson, date: e.target.value })}
        className="p-2 rounded w-full bg-slate-500"
        required={true}
      />
      <label>Время начала</label>
      <input
        type="time"
        value={lesson.startTime}
        onChange={(e) => setLesson({ ...lesson, startTime: e.target.value })}
        className="p-2 rounded w-full bg-slate-500"
        required={true}
      />
      <label>Время окончания</label>
      <input
        type="time"
        value={lesson.endTime}
        min={lesson.startTime}
        onChange={(e) => setLesson({ ...lesson, endTime: e.target.value })}
        className="p-2 rounded w-full bg-slate-500"
        required={true}
      />
      <label>Аудитория</label>
      <MyCombobox
        items={auditoriums}
        selected={lesson.auditorium}
        setSelected={(value) => setLesson({ ...lesson, auditorium: value })}
      />
      <label>Учебная группа</label>
      <MyCombobox
        items={studyGroups}
        selected={lesson.studyGroup}
        setSelected={(value) => setLesson({ ...lesson, studyGroup: value })}
      />
      <div className="flex gap-2">
        <input
          type="submit"
          value="Сохранить"
          className="p-2 rounded bg-slate-500"
        />
        <button
          className="p-2 rounded bg-slate-500"
          onClick={() => {
            setLesson({
              date: "",
              startTime: "",
              endTime: "",
              auditorium: {
                id: "",
                name: "",
              },
              studyGroup: {
                id: "",
                name: "",
              },
            });
          }}
        >
          Очистить
        </button>
      </div>
    </form>
  );
};
