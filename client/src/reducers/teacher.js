import TeacherConstants from "../constants/teacher";
const initialState = {
  courses: [],
  course: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TeacherConstants.GET_ALL_COURSES:
      return { ...state, courses: payload };
    case TeacherConstants.GET_COURSE_DETAILS:
      return { ...state, course: payload.course };
    case TeacherConstants.GET_ALL_PENDING:
      return { ...state, pending: payload };
    case TeacherConstants.GET_ALL_UNMARKED:
      return { ...state, unmarked: payload };
    default:
      return state;
  }
};
