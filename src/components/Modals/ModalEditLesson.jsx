import { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Transition,
  TransitionChild,
  Dialog,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ErrorNotification } from "../Notification";
import { MyCombobox } from "../MyComboBox";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

export const ModalEditLesson = ({ lesson, isOpen, setIsOpen }) => {
  const cancelButtonRef = useRef(null);
  const [editingLesson, setEditingLesson] = useState(lesson);
  const [errMsg, setErrMsg] = useState("");

  const handleEdit = async (editingLesson) => {
    try {
      const response = await axiosPrivate.put(
        `/api/v1/admin/lesson/${editingLesson.id}`,
        JSON.stringify({
          date: editingLesson.date,
          startTime: editingLesson.startTime,
          endTime: editingLesson.endTime,
          auditoriumId: editingLesson.auditorium.id,
          studyGroupId: editingLesson.studyGroup.id,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setIsOpen(false);
      lesson = Object.assign(lesson, editingLesson);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Нет ответа от сервера");
      } else if (err.response?.status === 409) {
        setErrMsg("Аудитория с таким именем уже существует");
      } else if (err.response?.status === 401) {
        setErrMsg("Недостаточно прав");
      } else {
        setErrMsg("Не удалось изменить аудиторию");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => setEditingLesson(lesson), 500);
  }, [isOpen, lesson]);

  useEffect(() => {
    setErrMsg("");
    if (editingLesson.startTime >= editingLesson.endTime) {
      setErrMsg("Время начала занятия не может быть позже времени окончания");
    }
  }, [editingLesson, setErrMsg]);

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const effectRun = useRef(false);
  const [auditoriums, setAuditoriums] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const getAuditoriums = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/admin/auditoriums", {
          signal,
        });
        // console.log(response.data);
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
        // console.log(response.data);
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
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEdit(editingLesson);
                  }}
                  className="flex flex-col gap-2 bg-slate-600 w-full text-white"
                >
                  <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/20 sm:mx-0 sm:h-10 sm:w-10">
                        <PencilIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6"
                        >
                          Изменение занятия
                        </DialogTitle>
                        <div className="mt-4">
                          <ErrorNotification message={errMsg} />
                          <label>Дата проведения</label>
                          <input
                            type="date"
                            value={editingLesson.date}
                            onChange={(e) =>
                              setEditingLesson({
                                ...editingLesson,
                                date: e.target.value,
                              })
                            }
                            className="p-2 rounded w-full bg-slate-500"
                            required={true}
                          />
                          <label>Время начала</label>
                          <input
                            type="time"
                            value={editingLesson.startTime}
                            onChange={(e) =>
                              setEditingLesson({
                                ...editingLesson,
                                startTime: e.target.value,
                              })
                            }
                            className="p-2 rounded w-full bg-slate-500"
                            required={true}
                          />
                          <label>Время окончания</label>
                          <input
                            type="time"
                            value={editingLesson.endTime}
                            min={editingLesson.startTime}
                            onChange={(e) =>
                              setEditingLesson({
                                ...editingLesson,
                                endTime: e.target.value,
                              })
                            }
                            className="p-2 rounded w-full bg-slate-500"
                            required={true}
                          />
                          <label>Аудитория</label>
                          <MyCombobox
                            items={auditoriums}
                            selected={editingLesson.auditorium}
                            setSelected={(value) =>
                              setEditingLesson({
                                ...editingLesson,
                                auditorium: value,
                              })
                            }
                          />
                          <label>Учебная группа</label>
                          <MyCombobox
                            items={studyGroups}
                            selected={editingLesson.studyGroup}
                            setSelected={(value) =>
                              setEditingLesson({
                                ...editingLesson,
                                studyGroup: value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black/20 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <input
                      type="submit"
                      value="Сохранить"
                      className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 sm:ml-3 sm:w-auto"
                    />
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setIsOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

ModalEditLesson.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
};
