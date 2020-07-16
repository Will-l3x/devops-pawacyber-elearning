import _ from "lodash";
import TeacherConstants from "../constants/teacher";
const initialState = {
  courses: [],
  live_course: {},
  streams: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TeacherConstants.GET_ALL_COURSES:
      return { ...state, courses: payload };
    case TeacherConstants.GET_ALL_PENDING:
      return { ...state, pending: payload };
    case TeacherConstants.GET_ALL_UNMARKED:
      return { ...state, unmarked: payload };
    case TeacherConstants.GET_LIVE_COURSE:
      return { ...state, live_course: payload };
    case TeacherConstants.FETCH_STREAMS:
      return { ...state.streams, ..._.mapKeys(payload, "id") };
    case TeacherConstants.FETCH_STREAM:
      return { ...state.streams, [payload.id]: payload };
    case TeacherConstants.CREATE_STREAM:
      return { ...state.streams, [payload.id]: payload };
    case TeacherConstants.EDIT_STREAM:
      return { ...state.streams, [payload.id]: payload };
    case TeacherConstants.DELETE_STREAM:
      return _.omit(state.streams, payload);
    default:
      return state;
  }
};
