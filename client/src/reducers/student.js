const initialState = {
  course: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_COURSE':
      return { ...state, ...payload };

    default:
      return state;
  }
};
