import { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Transition,
  TransitionChild,
  Dialog,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { ErrorNotification } from "../Notification";
import { MyCombobox } from "../MyComboBox";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export const ModalCreateLesson = ({ lesson, setLesson, isOpen, setIsOpen }) => {
  const cancelButtonRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const effectRun = useRef(false);

  const [errMsg, setErrMsg] = useState("");

  const [auditoriums, setAuditoriums] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);

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
      setIsOpen(false);
      navigate("/admin/lessons");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Нет ответа от сервера");
      } else if (err.response?.status === 400) {
        setErrMsg("Не удалось добавить занятие");
      } else if (err.response?.status === 401) {
        setErrMsg("Недостаточно прав");
      } else if (err.response?.status === 409) {
        setErrMsg(err.response?.message);
      } else {
        setErrMsg("Не удалось добавить занятие");
      }
    }
  };

  useEffect(() => {
    setErrMsg("");
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
                    createLesson(lesson);
                  }}
                  className="flex flex-col gap-2 w-full"
                >
                  <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 sm:mx-0 sm:h-10 sm:w-10">
                        <PlusCircleIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6"
                        >
                          Создание занятия
                        </DialogTitle>
                        <div className="mt-4">
                          <ErrorNotification message={errMsg} />
                          <label>Дата проведения</label>
                          <input
                            type="date"
                            value={lesson.date}
                            onChange={(e) =>
                              setLesson({ ...lesson, date: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required={true}
                          />
                          <label>Время начала</label>
                          <input
                            type="time"
                            value={lesson.startTime}
                            onChange={(e) =>
                              setLesson({
                                ...lesson,
                                startTime: e.target.value,
                              })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required={true}
                          />
                          <label>Время окончания</label>
                          <input
                            type="time"
                            value={lesson.endTime}
                            min={lesson.startTime}
                            onChange={(e) =>
                              setLesson({
                                ...lesson,
                                endTime: e.target.value,
                              })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required={true}
                          />
                          <label>Аудитория</label>
                          <MyCombobox
                            items={auditoriums}
                            selected={lesson.auditorium}
                            setSelected={(value) =>
                              setLesson({ ...lesson, auditorium: value })
                            }
                          />
                          <label>Учебная группа</label>
                          <MyCombobox
                            items={studyGroups}
                            selected={lesson.studyGroup}
                            setSelected={(value) =>
                              setLesson({ ...lesson, studyGroup: value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <input
                      type="submit"
                      value="Создать"
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

ModalCreateLesson.propTypes = {
  lesson: PropTypes.object.isRequired,
  setLesson: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
