
const initialState = {
  link: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'DASH_LINK':
      return {
        ...state,
        link: action.payload
      };
    default:
      return state;
  }
}
