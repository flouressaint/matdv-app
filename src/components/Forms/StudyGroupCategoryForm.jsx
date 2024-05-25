import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const StudyGroupCategoryForm = ({ addCategory, setErrMsg }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      console.log(value);
      addCategory(value);
      setValue("");
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [value, setErrMsg]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Категория"
        required
        autoComplete="off"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <button className="focus:bg-blue-700 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">
        Добавить
      </button>
    </form>
  );
};

StudyGroupCategoryForm.propTypes = {
  addCategory: PropTypes.func.isRequired,
  setErrMsg: PropTypes.func.isRequired,
};
