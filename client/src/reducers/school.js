import SchoolConstants from "../constants/school";
const initialState = {
  subscribed_courses: [],
  pages: [],
  course: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SchoolConstants.GET_SUBSCRIBED_COURSES:
      return {
        ...state,
        subscribed_courses: payload.subscribed_courses,
        pages: payload.pages,
      };
    case SchoolConstants.GET_SUBSCRIBE_COURSE:
      return { ...state, course: payload };
    case SchoolConstants.SUBSCRIBE_COURSE:
      return { ...state, new_course: payload };
    case SchoolConstants.UNSUBSCRIBE_COURSE:
      return { ...state, new_course: payload };
    case SchoolConstants.GET_ALL_TEACHERS:
      return { ...state, teachers: payload };
    case SchoolConstants.GET_ALL_STUDENTS:
      return { ...state, students: payload };
    default:
      return state;
  }
};
