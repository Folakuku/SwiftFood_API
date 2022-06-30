const successMsg = (res, message, data, state = 200) => {
  res.status(state).json({
    status: true,
    message,
    data,
  });
};

const errorMsg = (res, message, error, state = 400) => {
  res.status(state).json({
    status: false,
    message,
    error,
  });
};

module.exports = { successMsg, errorMsg };
