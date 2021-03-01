export const navClick = (link, location) => (dispatch) => {
  dispatch({
    type: 'DASH_LINK',
    payload: {link, location},
  });
};

