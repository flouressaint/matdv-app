// <NavLink
//   to={`/admin/study-groups/${group.id}`}
//   className="flex flex-row justify-between text-white items-center border-b border-gray-200 lg:w-full rounded lg:rounded-lg p-2 hover:bg-violet-200 dark:hover:bg-violet-600"
// >
import PropTypes from "prop-types";
import { useState } from "react";
import { ModalDelete } from "./Modals/ModalDelete";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ModalEditStudyGroup } from "./Modals/ModalEditStudyGroup";
// import { NavLink } from "react-router-dom";

export const StudyGroupItem = ({
  group,
  deleteGroup,
  teachers,
  categories,
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  return (
    <div className="flex flex-row justify-between items-center border-b border-gray-200  rounded-md p-2">
      {/* <NavLink
        to={`/admin/study-groups/${group.id}`}
        className="flex flex-col gap-2 w-full"
      > */}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row gap-2 items-center">
          <div className="text-sm border p-2 text-wrap rounded-xl">
            {group.category.name}
          </div>
          <div className="text-lg">{group.name}</div>
        </div>
        <div className="text-sm">Преподаватель: {group.teacher.name}</div>
      </div>
      {/* </NavLink> */}
      <div className="flex flex-row gap-2">
        <button
          onClick={() => setIsOpenEdit(true)}
          className="bg-transparent dark:bg-violet-500  hover:bg-violet-200 text-blue-700 font-semibold hover:text-white dark:text-white py-1 px-4 border border-blue-500 dark:border-transparent hover:border-transparent dark:hover:border-white rounded"
        >
          <PencilIcon className="size-6 text-blue-500" />
        </button>
        <button
          onClick={() => setIsOpenDelete(true)}
          className="bg-transparent dark:bg-red-500 hover:bg-red-200 text-red-700 dark:text-white dark:hover:border-white font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded"
        >
          <TrashIcon className="size-6 text-red-500" />
        </button>
      </div>
      <ModalEditStudyGroup
        group={group}
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        teachers={teachers}
        categories={categories}
      />
      <ModalDelete
        title="Удаление учебной группы"
        body="Вы действительно хотите удалить учебную группу? Все связанные с ней занятия будут удалены."
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        handleDelete={() => deleteGroup(group.id)}
      />
    </div>
  );
};

StudyGroupItem.propTypes = {
  group: PropTypes.object.isRequired,
  deleteGroup: PropTypes.func.isRequired,
  teachers: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};
