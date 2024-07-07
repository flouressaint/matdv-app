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
      <div className="flex flex-col bg-blue-500 w-72 border p-3 rounded text-sm">
        <div className="flex justify-between flex-row">
          <div className="font-bold text-lg py-2">{lesson.studyGroup.name}</div>
          <div className="flex flex-row h-min p-2 bg-green-500 rounded-xl items-center">
            <CheckBadgeIcon className="size-6" />
            <div className="text-white font-bold text-xl">5</div>
          </div>
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
            <div className="flex flex-row items-center gap-1">
              <BookOpenIcon className="size-4" />
              {lesson.hometask.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

StudentLessonItem.propTypes = {
  lesson: PropTypes.object.isRequired,
};
