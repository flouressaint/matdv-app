import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export const StudyGroupItem = ({ group }) => {
  return (
    <NavLink
      to={`/admin/study-groups/${group.id}`}
      className="flex flex-row justify-between text-white items-center border-b border-gray-200 lg:w-full rounded lg:rounded-lg p-2 hover:bg-violet-200 dark:hover:bg-violet-600"
    >
      <div className="flex flex-row items-center gap-5">
        <div className="rounded p-2 bg-violet-500">{group.category.name}</div>
        <div>{group.name}</div>
      </div>
      <div className="rounded p-2 bg-blue-500">{group.teacher.name}</div>
    </NavLink>
  );
};

StudyGroupItem.propTypes = {
  group: PropTypes.object.isRequired,
};
