import { useEffect, useRef, useState } from "react";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { StudyGroupItem } from "../../../components/StudyGroupItem";
import { StudyGroupForm } from "../../../components/Forms/StudyGroupForm";

export const StudyGroups = () => {
  const [studyGroups, setStudyGroups] = useState([]);
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

    const getStudyGroupCategories = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/studyGroupCategory", {
          signal,
        });
        console.log(response.data);
        isMounted && setCategories(response.data.items);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const getTeachers = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/admin/teachers", {
          signal,
        });
        console.log(response.data);
        isMounted && setTeachers(response.data.items);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    if (effectRun.current) {
      getStudyGroups();
      getStudyGroupCategories();
      getTeachers();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, [count, axiosPrivate, location, navigate]);

  return (
    <div className="flex flex-col p-5 gap-2 bg-slate-600 w-full text-white">
      <h1 className="text-red-500">{errMsg}</h1>
      {teachers.length > 0 && (
        <StudyGroupForm
          addStudyGroup={addStudyGroup}
          teachers={teachers}
          categories={categories}
          setErrMsg={setErrMsg}
        />
      )}
      <div className="flex flex-col my-5 gap-5">
        {studyGroups.length === 0 ? (
          <p>Нет учебных групп</p>
        ) : (
          studyGroups.map((group) => (
            <StudyGroupItem key={group.id} group={group} />
          ))
        )}
      </div>
    </div>
  );
};
