import {
  BookOpenIcon,
  BuildingOffice2Icon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { useState } from "react";
import { ModalAddHometask } from "./Modals/ModalAddHometask";

export const TeacherLessonItem = ({ lesson }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-blue-500 w-72 border p-3 rounded hover:bg-blue-400"
      onClick={() => setIsOpen(true)}
    >
      <div className="flex flex-col  text-sm">
        <div className="font-bold text-lg">{lesson.studyGroup.name}</div>
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
          {lesson.hometask && (
            <div className="flex flex-row items-center gap-1">
              <BookOpenIcon className="size-4" />
              {lesson.hometask.description}
            </div>
          )}
        </div>
      </div>
      <ModalAddHometask lesson={lesson} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

TeacherLessonItem.propTypes = {
  lesson: PropTypes.object.isRequired,
};
