import TeacherConstants from "../constants/teacher";
const initialState = {
  courses: [],
  live_course: {},
  streams: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TeacherConstants.GET_ALL_COURSES:
      state.courses = payload;
      return state;
    case TeacherConstants.GET_ALL_PENDING:
      state.pending = payload;
      return state;
    case TeacherConstants.GET_ALL_UNMARKED:
      state.unmarked = payload;
      return state;
    case TeacherConstants.GET_LIVE_COURSE:
      state.live_course = payload;
      return state;
    default:
      return state;
  }
};
