import {
  BuildingOffice2Icon,
  CheckBadgeIcon,
  ClockIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export const StudentLessonItem = ({ lesson }) => {
  return (
    <div>
      <div className="flex flex-col bg-blue-100 w-72 border rounded-xl shadow-md border-gray-300 p-3 text-sm">
        <div className="flex justify-between flex-row">
          <div className="text-lg">{lesson.studyGroup.name}</div>
          {lesson.score && (
            <div className="flex flex-row h-min p-1.5 bg-green-500 rounded-xl items-center">
              <CheckBadgeIcon className="size-6 text-white" />
              <div className="text-white font-bold text-xl">{lesson.score}</div>
            </div>
          )}
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
          {lesson.hometask && (
            <div>
              <BookOpenIcon className="size-4 mr-1 inline-flex" />
              {lesson.hometask.description}
            </div>
          )}
        </div>
        {lesson.studyGroup.name == "Мат. олимп-8-9" && lesson.score == null && (
          <div className="text-sm mt-3 text-white bg-orange-500 rounded-xl text-center border hover:bg-orange-400 p-3">
            Пройти тестирование
          </div>
        )}
      </div>
    </div>
  );
};

StudentLessonItem.propTypes = {
  lesson: PropTypes.object.isRequired,
};
