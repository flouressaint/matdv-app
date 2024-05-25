import { useEffect, useRef, useState } from "react";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { AuditoriumForm } from "../../../components/Forms/AuditoriumForm";
import { AuditoriumItem } from "../../../components/AuditoriumItem";

export const Auditorium = () => {
  const [auditoriums, setAuditoriums] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const effectRun = useRef(false);

  const [errMsg, setErrMsg] = useState("");
  const [count, setCount] = useState(0);

  const addAuditorium = async (auditorium) => {
    try {
      const response = await axiosPrivate.post(
        "/api/v1/admin/auditorium",
        JSON.stringify({ name: auditorium }),
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
        setErrMsg("Аудитория с таким именем уже существует");
      } else if (err.response?.status === 401) {
        setErrMsg("Недостаточно прав");
      } else {
        setErrMsg("Не удалось добавить аудиторию");
      }
    }
  };

  const deleteAuditorium = async (id) => {
    try {
      const response = await axiosPrivate.delete(
        `/api/v1/admin/auditorium/${id}`
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
        setErrMsg("Не удалось удалить аудиторию");
      }
    }
  };

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
        // response.data.items.map((auditorium) => (auditorium.isEditing = false));
        isMounted && setAuditoriums(response.data.items);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    if (effectRun.current) {
      getAuditoriums();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, [count, axiosPrivate, location, navigate]);

  return (
    <div className="flex flex-col m-5 gap-2">
      <h1 className="text-red-500">{errMsg}</h1>
      <AuditoriumForm addAuditorium={addAuditorium} setErrMsg={setErrMsg} />
      <div className="flex flex-col my-5 gap-5">
        {auditoriums.length === 0 ? (
          <p>Нет аудиторий</p>
        ) : (
          auditoriums.map((auditorium) => (
            <AuditoriumItem
              key={auditorium.id}
              auditorium={auditorium}
              deleteAuditorium={deleteAuditorium}
            />
          ))
        )}
      </div>
    </div>
  );
};
