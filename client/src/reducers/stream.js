const initialState = {
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
      return { ...state, create_meeting_res: payload };
    case "START_MEETING":
      payload.started = true;
      payload.stopped = false;
      return { ...state, startstop_meeting_res: payload };
    case "STOP_MEETING":
      payload.started = false;
      payload.stopped = true;
      return { ...state, startstop_meeting_res: payload };
    case "GET_MEETING":
      return { ...state, meeting: payload };
    case "GET_ALL_MEETINGS":
      return { ...state, meetings: payload };

    default:
      return state;
  }
};
