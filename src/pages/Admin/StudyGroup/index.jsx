import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { ModalDelete } from "../../../components/Modals/ModalDelete";
import { MyCombobox } from "../../../components/MyComboBox";

export const StudyGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [studyGroup, setStudyGroup] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const effectRun = useRef(false);

  const [editStudyGroup, setEditStudyGroup] = useState({
    name: studyGroup?.name,
    category: studyGroup?.category,
    teacher: studyGroup?.teacher,
  });

  const [categories, setCategories] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const getStudyGroup = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/v1/admin/studyGroup/${id}`,
          {
            signal,
          }
        );
        isMounted && setStudyGroup(response.data);
        setEditStudyGroup(response.data);
        console.log(response.data);
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
      getStudyGroup();
      getStudyGroupCategories();
      getTeachers();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, [id, axiosPrivate, navigate, isEdit]);

  const handleDelete = async (id) => {
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

  const handleEdit = async (editStudyGroup) => {
    try {
      const response = await axiosPrivate
        .patch(
          `/api/v1/admin/studyGroup/${id}`,
          JSON.stringify({
            name: editStudyGroup.name,
            teacherId: editStudyGroup.teacher.id,
            categoryId: editStudyGroup.category.id,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response.data);
          setIsEdit(false);
        });
      console.log(response.data);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Нет ответа от сервера");
      } else if (err.response?.status === 409) {
        setErrMsg("Категория с таким именем уже существует");
      } else if (err.response?.status === 401) {
        setErrMsg("Недостаточно прав");
      } else {
        setErrMsg("Не удалось изменить категорию");
      }
    }
  };

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
      {isEdit ? (
        <div className="flex flex-col p-5 gap-2 border rounded-lg">
          <div className="flex flex-row justify-between">
            <div className="text-xl flex flex-row gap-2 items-center">
              Группа:
              <input
                type="text"
                className=" text-black rounded p-1"
                defaultValue={studyGroup?.name}
                onChange={(e) => {
                  setErrMsg("");
                  setEditStudyGroup({
                    ...editStudyGroup,
                    name: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="rounded text-sm">
            Категория:
            <MyCombobox
              items={categories}
              selected={editStudyGroup.category}
              setSelected={(value) =>
                setEditStudyGroup({ ...editStudyGroup, category: value })
              }
            />
          </div>
          <div>
            Преподаватель:
            <MyCombobox
              items={teachers}
              selected={editStudyGroup.teacher}
              setSelected={(value) =>
                setEditStudyGroup({ ...editStudyGroup, teacher: value })
              }
            />
          </div>
          <p className="text-red-500">{errMsg}</p>
          <div className="flex flex-row gap-3">
            <button
              onClick={() => handleEdit(editStudyGroup)}
              className="bg-slate-800 text-white hover:bg-zinc-700 py-2 px-4 rounded-xl"
            >
              Сохранить
            </button>
            <button
              onClick={() => setIsEdit(false)}
              className="bg-slate-800 text-white hover:bg-zinc-700 py-2 px-4 rounded-xl"
            >
              Отмена
            </button>
          </div>
          <div>
            Ученики:
            {studyGroup?.students.map((student) => (
              <div key={student.id}>{student.name}</div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 h-full">
          <button
            onClick={() => navigate("/admin/study-groups")}
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
          <div className="flex flex-col p-5 gap-2 border h-full rounded-lg">
            <div className="flex flex-row justify-between">
              <div className="text-xl">Группа: {studyGroup?.name}</div>
              <div className="flex flex-row gap-3">
                <button
                  onClick={() => setIsEdit(true)}
                  className="bg-transparent dark:bg-violet-500  hover:bg-violet-500 text-blue-700 font-semibold hover:text-white dark:text-white py-1 px-4 border border-blue-500 dark:border-transparent hover:border-transparent dark:hover:border-white rounded"
                >
                  <PencilIcon className="size-6 text-blue-500" />
                </button>
                <button
                  onClick={() => setIsOpenDelete(true)}
                  className="bg-transparent dark:bg-red-500 hover:bg-red-500 text-red-700 dark:text-white dark:hover:border-white font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded"
                >
                  <TrashIcon className="size-6 text-red-500" />
                </button>
              </div>
            </div>
            <div className="rounded text-sm">
              Категория: {studyGroup?.category.name}
            </div>
            <div>Преподаватель: {studyGroup?.teacher.name}</div>
            <div>
              Ученики:
              {studyGroup?.students.map((student) => (
                <div key={student.id}>{student.name}</div>
              ))}
            </div>
          </div>
          <ModalDelete
            title="удалить учебную группу?"
            body="удалить учебную группу?"
            isOpen={isOpenDelete}
            setIsOpen={setIsOpenDelete}
            handleDelete={() => handleDelete(id)}
          />
        </div>
      )}
    </div>
  );
};
