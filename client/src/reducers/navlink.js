const initialState = {
  link: "",
  location: "",
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case "DASH_LINK":
      state.link = payload.link;
      state.location = payload.location;
      return state;
    default:
      return state;
  }
}
