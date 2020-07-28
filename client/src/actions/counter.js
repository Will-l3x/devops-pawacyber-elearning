import StreamActions from "./stream";

export const prevClick = (payload) => (dispatch) => {
  dispatch({
    type: "PREV_CLICK",
    payload,
  });
  dispatch(StreamActions.get_meetings(payload--));
};
export const nextClick = (payload) => (dispatch) => {
  dispatch({
    type: "NEXT_CLICK",
    payload,
  });
  dispatch(StreamActions.get_meetings(payload++));
};
export const pageClick = (payload) => (dispatch) => {
  dispatch({
    type: "PAGE_CLICK",
    payload,
  });
  dispatch(StreamActions.get_meetings(payload));
};

const CounterActions = {
  prevClick,
  nextClick,
  pageClick,
};
export default CounterActions;
