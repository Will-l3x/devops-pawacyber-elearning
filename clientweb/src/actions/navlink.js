export const navClick = (link) => (dispatch) => {
  dispatch({
    type: 'DASH_LINK',
    payload: link,
  });
};

