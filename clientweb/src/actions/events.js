/** Event actions */

import { EventService } from "../services/events";
import { EventConstants } from "../constants/events";
import AlertActions  from "./alert";

export const get_events = (user_id) => (dispatch) => {
  EventService.get_events(user_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: EventConstants.GET_USER_EVENTS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error); dispatch(AlertActions.error(error));
    });
};
export const post_events = (user_id, data) => (
  dispatch
) => {
  EventService.post_events(user_id, data)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: EventConstants.ADD_USER_EVENTS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error); dispatch(AlertActions.error(error));
    });
};
export const update_events = (user_id, data) => (
  dispatch
) => {
  EventService.update_events(user_id, data)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: EventConstants.UPDATE_USER_EVENTS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error); dispatch(AlertActions.error(error));
    });
};
export const delete_events = (user_id, event_id) => (
  dispatch
) => {
  EventService.delete_events(user_id, event_id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: EventConstants.DELETE_USER_EVENTS,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error); dispatch(AlertActions.error(error));
    });
};
const EventActions = {
  get_events,
  post_events,
  update_events,
  delete_events,
};
export default EventActions;
