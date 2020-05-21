import { AlertConstants } from "../constants/alert";

export const success = (message) => {
  return { type: AlertConstants.ALERT_SUCCESS, message };
};

export const error = (message) => {
  return { type: AlertConstants.ALERT_ERROR, message };
};

const AlertActions = {
  success,
  error,
};

export default AlertActions;