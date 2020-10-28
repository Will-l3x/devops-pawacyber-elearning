import AdminConstants from "../constants/admin";
const initialState = {
  courses: [],
  pages: [],
  course_content: [],
  deleted_course_info: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AdminConstants.GET_ALL_COURSES:
      state.courses = payload.courses;
      state.pages = payload.pages;
      return state;
    case AdminConstants.ADD_NEW_COURSE:
      state.new_course = payload;
      return state;
    case AdminConstants.GET_COURSE_CONTENT:
      state.course_content = payload;
      return state;
    case AdminConstants.ADD_COURSE_TOPIC:
      state.new_course_topic = payload;
      return state;
    case AdminConstants.GET_COURSE_MATERIAL:
      state.course_material = payload;
      return state;
    case AdminConstants.ADD_COURSE_MATERIAL:
      state.new_course_material = payload;
      return state;
    case AdminConstants.UPDATE_COURSE_MATERIAL:
      state.course_material_update = payload;
      return state;
    case AdminConstants.DELETE_COURSE:
      state.deleted_course_info = payload;
      return state;
    case AdminConstants.DELETE_COURSE_TOPIC:
      state.deleted_topic_info = payload;
      return state;
    case AdminConstants.GET_ALL_TEACHERS:
      state.teachers = payload;
      return state;
    case AdminConstants.CONFIRM_TEACHER:
      state.teacher_confirmation = payload;
      return state;
    case AdminConstants.GET_SUBCRIPTION_INFO:
      state.subscriptions = payload;
      return state;
    case AdminConstants.UPDATE_SUBCRIPTION_INFO:
      state.updated_subscription = payload;
      return state;
    case AdminConstants.GET_TOPIC_CONTENT:
      state.topic_content = payload;
      return state;

    default:
      return state;
  }
};
