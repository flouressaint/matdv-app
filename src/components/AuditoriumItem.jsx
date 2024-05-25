import PropTypes from "prop-types";
import { useState } from "react";
import { ModalDelete } from "./Modals/ModalDelete";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ModalEditAuditorium } from "./Modals/ModalEditAuditorium";

export const AuditoriumItem = ({ auditorium, deleteAuditorium }) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  return (
    <div className="flex flex-row justify-between items-center border-b border-gray-200 rounded-md p-2">
      <p>{auditorium.name}</p>
      <div className="flex flex-row gap-2">
        <button
          onClick={() => setIsOpenEdit(true)}
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
      <ModalEditAuditorium
        auditorium={auditorium}
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
      />
      <ModalDelete
        title="удалить аудиторию"
        body="удалить аудиторию?"
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        handleDelete={() => deleteAuditorium(auditorium.id)}
      />
    </div>
  );
};

AuditoriumItem.propTypes = {
  auditorium: PropTypes.object.isRequired,
  deleteAuditorium: PropTypes.func.isRequired,
};
