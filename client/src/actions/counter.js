export const prevClick = (payload) => (dispatch) => {
  dispatch({
    type: "PREV_CLICK",
    payload,
  });
};
export const nextClick = (payload) => (dispatch) => {
  dispatch({
    type: "NEXT_CLICK",
    payload,
  });
};
export const pageClick = (payload) => (dispatch) => {
  dispatch({
    type: "PAGE_CLICK",
    payload,
  });
};

const CounterActions = {
  prevClick,
  nextClick,
  pageClick,
};
export default CounterActions;
