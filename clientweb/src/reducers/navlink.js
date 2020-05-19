
const initialState = {
  link: '',
  location: ''
};

export default function(state = initialState,{type , payload}) {
  switch (type) {
    case 'DASH_LINK':
      return {
        ...state,
        link: payload.link,
        location: payload.location
      };
    default:
      return state;
  }
}
