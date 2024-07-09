import {
  BuildingOffice2Icon,
  ClockIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { ModalDelete } from "../components/Modals/ModalDelete";
import { ModalEditLesson } from "./Modals/ModalEditLesson";

export const LessonItem = ({
  lesson,
  auditoriums,
  studyGroups,
  deleteLesson,
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  return (
    <div>
      <div className="flex flex-col bg-blue-100 w-72 border border-gray-300 shadow-md p-3 rounded-xl text-sm">
        <div className="flex justify-between items-center flex-row">
          <div className="text-lg">{lesson.studyGroup.name}</div>
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-blue-200 py-1.5 h-min px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-300 data-[open]:bg-blue-300 data-[focus]:outline-1 data-[focus]:outline-white">
              <EllipsisHorizontalIcon className="size-4 fill-black/60" />
            </MenuButton>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-black/5 bg-blue-200 shadow-inner p-1 text-sm/6 [--anchor-gap:var(--spacing-1)] focus:outline-none"
              >
                <MenuItem>
                  <button
                    onClick={() => setIsOpenEdit(true)}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                  >
                    <PencilIcon className="size-4 fill-black/30" />
                    Изменить
                  </button>
                </MenuItem>
                <div className=" h-px bg-white/5" />
                <MenuItem>
                  <button
                    onClick={() => setIsOpenDelete(true)}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                  >
                    <TrashIcon className="size-4 fill-black/30" />
                    Удалить
                  </button>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
        <div className="flex flex-col text-base">
          <div className="flex flex-row w-1/2 items-center gap-1">
            <ClockIcon className="size-4" />
            {lesson.startTime}-{lesson.endTime}
          </div>
          <div className="flex flex-row w-1/2  items-center gap-1">
            <BuildingOffice2Icon className="size-4" />
            <div className="w-2/3 break-words">{lesson.auditorium.name}</div>
          </div>
          <div>{lesson.studyGroup.teacher.name}</div>
        </div>
      </div>
      <ModalEditLesson
        lesson={lesson}
        auditoriums={auditoriums}
        studyGroups={studyGroups}
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
      />
      <ModalDelete
        title="Удаление занятия"
        body="Вы действительно хотите удалить занятие из расписания? Все данные о занятии будут утеряны."
        handleDelete={() => deleteLesson(lesson.id)}
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
      />
    </div>
  );
};

LessonItem.propTypes = {
  lesson: PropTypes.object.isRequired,
  deleteLesson: PropTypes.func.isRequired,
  auditoriums: PropTypes.array.isRequired,
  studyGroups: PropTypes.array.isRequired,
};
