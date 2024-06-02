import PropTypes from "prop-types";

export const SuccessNotification = ({ message }) => {
  return (
    <div className="bg-green-600 text-white rounded-md text-center">
      {message}
    </div>
  );
};

SuccessNotification.propTypes = {
  message: PropTypes.string.isRequired,
};

export const ErrorNotification = ({ message }) => {
  return (
    <div className="bg-red-600 text-white rounded-md text-center">
      {message}
    </div>
  );
};

ErrorNotification.propTypes = {
  message: PropTypes.string.isRequired,
};
