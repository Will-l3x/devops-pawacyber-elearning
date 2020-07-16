const initialState = {
  course: {},
  live_course: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_COURSE":
      return { ...state, course: payload };
    case "GET_LIVE_COURSE":
      return { ...state, live_course: payload };

    default:
      return state;
  }
};
