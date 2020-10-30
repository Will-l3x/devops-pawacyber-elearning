const initialState = {
  course: {},
  live_course: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_COURSE":
      state.course = payload;
      return state;
    case "GET_LIVE_COURSE":
      state.live_course = payload;
      return state;

    default:
      return state;
  }
};
