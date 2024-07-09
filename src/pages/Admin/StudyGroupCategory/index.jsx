import { useEffect, useRef, useState } from "react";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { StudyGroupCategoryItem } from "../../../components/StudyGroupCategoryItem";
import { StudyGroupCategoryForm } from "../../../components/Forms/StudyGroupCategoryForm";

export const StudyGroupCategory = () => {
  const [categories, setCategories] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const effectRun = useRef(false);

  const [errMsg, setErrMsg] = useState("");
  const [count, setCount] = useState(0);

  const addCategory = async (category) => {
    try {
      const response = await axiosPrivate.post(
        "/api/v1/admin/studyGroupCategory",
        JSON.stringify({ name: category }),
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
        setErrMsg("Категория с таким именем уже существует");
      } else if (err.response?.status === 401) {
        setErrMsg("Недостаточно прав");
      } else {
        setErrMsg("Не удалось добавить категорию");
      }
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await axiosPrivate.delete(
        `/api/v1/admin/studyGroupCategory/${id}`
      );
      console.log(response.data);
      setCount(count + 1);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Нет ответа от сервера");
      } else if (err.response?.status === 401) {
        setErrMsg("Недостаточно прав");
      } else {
        setErrMsg("Не удалось удалить категорию");
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const getCategories = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/studyGroupCategory", {
          signal,
        });
        console.log(response.data);
        // response.data.items.map((auditorium) => (auditorium.isEditing = false));
        isMounted && setCategories(response.data.items);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    if (effectRun.current) {
      getCategories();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, [count, axiosPrivate, location, navigate]);

  return (
    <div className="flex flex-col m-5 gap-2 lg:w-full">
      <div className="text-3xl font-bold">Категории учебных групп</div>
      <h1 className="text-red-500">{errMsg}</h1>
      <StudyGroupCategoryForm addCategory={addCategory} setErrMsg={setErrMsg} />
      <div className="flex flex-col my-5 gap-5">
        {categories.length === 0 ? (
          <p>Нет категорий</p>
        ) : (
          categories.map((category) => (
            <StudyGroupCategoryItem
              key={category.id}
              category={category}
              deleteCategory={deleteCategory}
            />
          ))
        )}
      </div>
    </div>
  );
};
