import EventConstants  from "../constants/events";
const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case EventConstants.GET_USER_EVENTS:
      return { ...state, events: payload };
    case EventConstants.ADD_USER_EVENTS:
      return { ...state, new_event: payload };
    case EventConstants.UPDATE_USER_EVENTS:
      return { ...state, updated_event: payload };
    case EventConstants.DELETE_USER_EVENTS:
      return { ...state, deleted_event: payload };

    default:
      return state;
  }
};
