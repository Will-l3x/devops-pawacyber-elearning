import SchoolConstants from "../constants/school";
const initialState = {
  subscribed_courses: [],
  pages: [],
  course: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SchoolConstants.GET_SUBSCRIBED_COURSES:
      state.subscribed_courses = payload.subscribed_courses;
      state.pages = payload.pages;
      return state;
    case SchoolConstants.GET_SUBSCRIBE_COURSE:
      state.course = payload;
      return state;
    case SchoolConstants.SUBSCRIBE_COURSE:
      state.new_course = payload;
      return state;
    case SchoolConstants.UNSUBSCRIBE_COURSE:
      state.new_course = payload;
      return state;
    case SchoolConstants.GET_ALL_TEACHERS:
      state.teachers = payload;
      return state;
    case SchoolConstants.GET_ALL_STUDENTS:
      state.students = payload;
      return state;
    default:
      return state;
  }
};
