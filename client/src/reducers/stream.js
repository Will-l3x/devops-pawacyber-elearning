const initialState = {
  pages: [],
  meetings: [],
  meeting: {},
  create_meeting_res: {},
  startstop_meeting_res: {
    started: false,
    stopped: true,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "CREATE_MEETING":
      state.create_meeting_res = payload;
      return state;
    case "START_MEETING":
      payload.started = true;
      payload.stopped = false;
      state.startstop_meeting_res = payload;
      return state;
    case "STOP_MEETING":
      payload.started = false;
      payload.stopped = true;
      state.startstop_meeting_res = payload;
      return state;
    case "GET_MEETING":
      state.meeting = payload;
      return state;
    case "GET_ALL_MEETINGS":
      state.meetings = payload.meetings;
      state.pages = payload.pages;
      return state;
    case "GET_ALL_MEETINGS_BY_CLASSID":
      state.meetings = payload;
      return state;
    case "GET_ALL_MEETINGS_BY_CREATORID":
      state.meetings = payload;
      return state;

    default:
      return state;
  }
};
