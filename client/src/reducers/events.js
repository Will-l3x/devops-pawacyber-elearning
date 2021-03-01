import EventConstants from "../constants/events";
const initialState = {
  events: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case EventConstants.GET_USER_EVENTS:
      state.events = payload;
      return state;
    case EventConstants.ADD_USER_EVENTS:
      state.new_event = payload;
      return state;
    case EventConstants.UPDATE_USER_EVENTS:
      state.updated_event = payload;
      return state;
    case EventConstants.DELETE_USER_EVENTS:
      state.deleted_event = payload;
      return state;

    default:
      return state;
  }
};
