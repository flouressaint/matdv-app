import { useEffect, useRef, useState } from "react";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { StudyGroupItem } from "../../../components/StudyGroupItem";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ModalCreateStudyGroup } from "../../../components/Modals/ModalCreateStudyGroup";

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
      setCreateIsOpen(false);
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

  const deleteStudyGroup = async (id) => {
    try {
      const response = await axiosPrivate.delete(
        `/api/v1/admin/studyGroup/${id}`
      );
      console.log(response.data);
      // navigate to home page
      navigate("/admin/study-groups");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Нет ответа от сервера");
      } else if (err.response?.status === 401) {
        setErrMsg("Недостаточно прав");
      } else {
        setErrMsg("Не удалось удалить учебную группу");
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

  const [createIsOpen, setCreateIsOpen] = useState(false);

  return (
    <div className="flex flex-col p-5 gap-2  w-full ">
      <div className="flex flex-row justify-between items-center">
        <div className="text-3xl font-bold">Учебные группы</div>
        <button
          onClick={() => setCreateIsOpen(!createIsOpen)}
          className="text-base flex flex-row gap-2 focus:bg-blue-700 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <PlusCircleIcon className="size-6" />
          <div>Добавить</div>
        </button>
      </div>
      <h1 className="text-red-500">{errMsg}</h1>
      <div className="flex flex-col my-5 gap-2">
        {studyGroups.length === 0 ? (
          <p>Нет учебных групп</p>
        ) : (
          studyGroups.map((group) => (
            <StudyGroupItem
              key={group.id}
              group={group}
              deleteGroup={deleteStudyGroup}
              teachers={teachers}
              categories={categories}
            />
          ))
        )}
      </div>
      <ModalCreateStudyGroup
        addStudyGroup={addStudyGroup}
        teachers={teachers}
        categories={categories}
        setErrMsg={setErrMsg}
        isOpen={createIsOpen}
        setIsOpen={setCreateIsOpen}
      />
    </div>
  );
};
