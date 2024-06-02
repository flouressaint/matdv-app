import PropTypes from "prop-types";

export const LessonItem = ({ lesson }) => {
  return (
    <div className="flex flex-row justify-between items-center border-b border-gray-200 rounded-md p-2">
      <p>{lesson.date}</p>
      <p>
        {lesson.startTime}-{lesson.endTime}
      </p>
      <p>{lesson.auditorium.name}</p>
      <p>{lesson.studyGroup.name}</p>
    </div>
  );
};

LessonItem.propTypes = {
  lesson: PropTypes.object.isRequired,
};
