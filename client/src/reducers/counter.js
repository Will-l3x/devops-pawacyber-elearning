const intialState = {
  currentPageNumber: 1,
};

export default (state = intialState, { type, payload }) => {
  switch (type) {
    case "NEXT_CLICK":
      console.log(payload++);
      return { currentPageNumber: payload++ };
    case "PREV_CLICK":
      console.log(payload--);
      return { currentPageNumber: payload-- };
    case "PAGE_CLICK":
      return { currentPageNumber: payload };

    default:
      return state;
  }
};
