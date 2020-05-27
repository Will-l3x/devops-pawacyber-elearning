import { AlertConstants } from "../constants/alert";

export function alert(state = {}, { type, message }) {
  switch (type) {
    case AlertConstants.ALERT_SUCCESS:
      return {
        type: "alert-success",
        message,
      };
    case AlertConstants.ALERT_ERROR:
      return {
        type: "alert-danger",
        message,
      };
    default:
      return state;
  }
}
