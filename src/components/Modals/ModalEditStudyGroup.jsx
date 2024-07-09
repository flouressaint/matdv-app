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

export const ModalEditStudyGroup = ({
  group,
  teachers,
  categories,
  isOpen,
  setIsOpen,
}) => {
  const cancelButtonRef = useRef(null);
  const [editingGroup, setEditingGroup] = useState(group);
  const [errMsg, setErrMsg] = useState("");

  const handleEdit = async (editingGroup) => {
    try {
      const response = await axiosPrivate.patch(
        `/api/v1/admin/studyGroup/${editingGroup.id}`,
        JSON.stringify({
          name: editingGroup.name,
          teacherId: editingGroup.teacher.id,
          categoryId: editingGroup.category.id,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setIsOpen(false);
      group = Object.assign(group, editingGroup);
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
    setTimeout(() => setEditingGroup(group), 500);
  }, [isOpen, group]);

  const axiosPrivate = useAxiosPrivate();

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
                    handleEdit(editingGroup);
                  }}
                  className="flex flex-col gap-2 w-full"
                >
                  <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 sm:mx-0 sm:h-10 sm:w-10">
                        <PencilIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center w-full sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6"
                        >
                          Изменение учебной группы
                        </DialogTitle>
                        <div className="mt-4">
                          <ErrorNotification message={errMsg} />

                          <div className="mt-2">Название</div>
                          <input
                            type="text"
                            value={editingGroup.name}
                            onChange={(e) =>
                              setEditingGroup({
                                ...editingGroup,
                                name: e.target.value,
                              })
                            }
                            placeholder="Учебная группа..."
                            required
                            autoComplete="off"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />

                          <div className="mt-2">Преподаватель</div>
                          <MyCombobox
                            items={teachers}
                            selected={editingGroup.teacher}
                            setSelected={(value) =>
                              setEditingGroup({
                                ...editingGroup,
                                teacher: value,
                              })
                            }
                          />
                          <div className="mt-2">Категория</div>
                          <MyCombobox
                            items={categories}
                            selected={editingGroup.category}
                            setSelected={(value) =>
                              setEditingGroup({
                                ...editingGroup,
                                category: value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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

ModalEditStudyGroup.propTypes = {
  teachers: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
};
