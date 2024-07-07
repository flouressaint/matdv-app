import { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Transition,
  TransitionChild,
  Dialog,
  DialogTitle,
  DialogPanel,
  Textarea,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ErrorNotification } from "../Notification";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

export const ModalAddHometask = ({ lesson, isOpen, setIsOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  const cancelButtonRef = useRef(null);
  const [hometask, setHometask] = useState(
    lesson.hometask || {
      description: "",
      maxScore: 5,
    }
  );
  const [errMsg, setErrMsg] = useState("");

  const getStudyGroup = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/v1/teacher/studyGroup/${lesson.studyGroup.id}`
      );
      setScores(
        response.data.students.map((s) => {
          return {
            studentId: s.id,
            name: s.name,
            value: 0,
          };
        })
      );
      console.log(
        response.data.students.map((s) => {
          return {
            studentId: s.id,
            name: s.name,
            value: 0,
          };
        })
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getInitialScores = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/v1/teacher/lesson/${lesson.id}/scores`
      );
      console.log(response.data);
      setScores(
        scores.map((s) => {
          if (response.data.items.find((ss) => ss.studentId === s.studentId)) {
            return {
              ...s,
              value: response.data.items.find(
                (ss) => ss.studentId === s.studentId
              ).value,
            };
          }
          return s;
        })
      );
      console.log(
        scores.map((s) => {
          if (response.data.items.find((ss) => ss.studentId === s.studentId)) {
            return {
              ...s,
              value: response.data.items.find(
                (ss) => ss.studentId === s.studentId
              ).value,
            };
          }
          return s;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const [scores, setScores] = useState();

  const [count, setCount] = useState(0);
  if (isOpen && count === 0) {
    getStudyGroup();
    setCount(1);
  }

  if (count === 1 && scores !== undefined) {
    getInitialScores();
    setCount(2);
  }

  const handleEdit = async (hometask) => {
    if (!hometask.description) {
      setErrMsg("Описание домашнего задания не может быть пустым.");
      return;
    }
    try {
      const response = await axiosPrivate.post(
        `/api/v1/teacher/lesson/${lesson.id}/hometask`,
        JSON.stringify({
          description: hometask.description,
          maxScore: hometask.maxScore,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const scoreResponse = await axiosPrivate.post(
        `/api/v1/teacher/lesson/${lesson.id}/scores`,
        JSON.stringify({
          scores: scores
            .filter((s) => s.value !== 0)
            .map((s) => {
              return { studentId: s.studentId, value: parseInt(s.value) };
            }),
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(scoreResponse.data);
      setIsOpen(false);
      lesson = Object.assign(lesson, { ...lesson, hometask });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("Нет ответа от сервера");
      } else if (err.response?.status === 401) {
        setErrMsg("Недостаточно прав");
      } else {
        setErrMsg("Не удалось задать домашнее задание");
      }
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [hometask]);

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
                    handleEdit(hometask);
                  }}
                  className="flex flex-col gap-2 bg-slate-600 w-full text-white"
                >
                  <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black/20 sm:mx-0 sm:h-10 sm:w-10">
                        <PencilIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center w-full sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base items-center flex flex-row justify-between font-semibold leading-6"
                        >
                          <div>Домашнее задание</div>
                          <div className="text-sm bg-orange-500 rounded border hover:bg-orange-400 p-3">
                            Задать адаптивный тест
                          </div>
                        </DialogTitle>
                        <div className="mt-4">
                          <ErrorNotification message={errMsg} />
                          <Field>
                            <Textarea
                              value={hometask.description}
                              onChange={(e) => {
                                setHometask({
                                  ...hometask,
                                  description: e.target.value,
                                });
                              }}
                              className="mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white 
                                  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                              rows={8}
                              placeholder="Описание домашнего задания..."
                            />
                          </Field>
                          <Field className="mt-3 flex flex-row items-center gap-3">
                            <Label>Максимальный балл за выполнение:</Label>
                            <Input
                              type="number"
                              min={0}
                              value={hometask.maxScore}
                              onChange={(e) => {
                                setHometask({
                                  ...hometask,
                                  maxScore: parseInt(e.target.value),
                                });
                              }}
                              className="block w-16 resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white 
                                  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                            />
                          </Field>
                          <div>Ученики</div>
                          {!scores && <div>loading</div>}
                          {scores &&
                            scores.map((student) => (
                              <div key={student.studentId}>
                                <div className="flex flex-row justify-between items-center border-b  border-gray-500 hover:bg-gray-500 rounded-md p-2">
                                  <div className="text-sm font-bold">
                                    {student.name}
                                  </div>
                                  <input
                                    type="number"
                                    min={0}
                                    max={hometask.maxScore}
                                    value={student.value}
                                    onChange={(e) => {
                                      setScores(
                                        scores.map((s) =>
                                          s.studentId === student.studentId
                                            ? { ...s, value: e.target.value }
                                            : s
                                        )
                                      );
                                    }}
                                    className="w-16 text-center resize-none rounded-lg bg-white/5 py-1.5 px-3 text-sm/6 text-white
                      focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                  />
                                </div>
                              </div>
                            ))}
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

ModalAddHometask.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
};
