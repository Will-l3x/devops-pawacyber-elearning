const initialState = {
  files: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "UPLOAD_FILE":
      return { ...state, files: payload };

    default:
      return state;
  }
};
