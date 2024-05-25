import { useState } from "react";
import PropTypes from "prop-types";

export const EditAuditoriumForm = ({ editAuditorium, auditorium }) => {
  const [value, setValue] = useState(auditorium.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    editAuditorium(value, auditorium.id);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Сохранить
      </button>
    </form>
  );
};

EditAuditoriumForm.propTypes = {
  editAuditorium: PropTypes.func.isRequired,
  auditorium: PropTypes.object.isRequired,
};
