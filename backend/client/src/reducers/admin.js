import AdminConstants  from "../constants/admin";
const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AdminConstants.GET_ALL_COURSES:
      return { ...state, courses: payload };
    case AdminConstants.ADD_NEW_COURSE:
      return { ...state, new_course: payload };
    case AdminConstants.ADD_COURSE_TOPIC:
      return { ...state, new_course_topic: payload };
    case AdminConstants.GET_COURSE_MATERIAL:
      return { ...state, course_material: payload };
    case AdminConstants.ADD_COURSE_MATERIAL:
      return { ...state, new_course_material: payload };
    case AdminConstants.UPDATE_COURSE_MATERIAL:
      return { ...state, course_material_update: payload };
    case AdminConstants.DELETE_COURSE:
      return { ...state, deleted_course_info: payload };
    case AdminConstants.DELETE_COURSE_TOPIC:
      return { ...state, deleted_topic_info: payload };
    case AdminConstants.GET_ALL_TEACHERS:
      return { ...state, teachers: payload };
    case AdminConstants.CONFIRM_TEACHER:
      return { ...state, teacher_confirmation: payload };
    case AdminConstants.GET_SUBCRIPTION_INFO:
      return { ...state, subscriptions: payload };
    case AdminConstants.UPDATE_SUBCRIPTION_INFO:
      return { ...state, updated_subscription: payload };
    case AdminConstants.GET_TOPIC_CONTENT:
      console.log(payload);
      return { ...state, topic_content: payload };

    default:
      return state;
  }
};
