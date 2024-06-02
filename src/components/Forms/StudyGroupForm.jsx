import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MyCombobox } from "../MyComboBox";

export const StudyGroupForm = ({
  addStudyGroup,
  teachers,
  categories,
  setErrMsg,
}) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      console.log(value);
      addStudyGroup(value, selectedTeacher.id, selectedCategory.id);
      setValue("");
    }
  };

  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    setErrMsg("");
  }, [value, setErrMsg]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 lg:w-1/2 text-white"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Учебная группа"
        required
        autoComplete="off"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <div className="flex flex-col">
        <p>Преподаватель</p>
        <MyCombobox
          items={teachers}
          selected={selectedTeacher}
          setSelected={setSelectedTeacher}
        />
      </div>
      <div className="flex flex-col">
        <p>Категория</p>
        <MyCombobox
          items={categories}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
      </div>
      <button className="focus:bg-blue-700 text-white bg-blue-700 border-2 border-white/25 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">
        Добавить
      </button>
    </form>
  );
};

StudyGroupForm.propTypes = {
  addStudyGroup: PropTypes.func.isRequired,
  setErrMsg: PropTypes.func.isRequired,
  teachers: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};
