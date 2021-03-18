const intialState = {
  currentPageNumber: 1,
};

export default (state = intialState, { type, payload }) => {
  switch (type) {
    case "NEXT_CLICK":
      state.currentPageNumber = payload++;
      return state;
    case "PREV_CLICK":
      state.currentPageNumber = payload--;
      return state;
    case "PAGE_CLICK":
      state.currentPageNumber = payload;
      return state;

    default:
      return state;
  }
};
