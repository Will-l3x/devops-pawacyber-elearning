import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import admin from "./admin";
import classroom from "./classroom";
import events from "./events";
import teacher from "./teacher";
import dashLink from "./navlink";
import student from "./student";
import fileUpload from "./fileUpload";

export default combineReducers({
  routing: routerReducer,
  dashLink,
  admin,
  student,
  teacher,
  events,
  classroom,
  fileUpload,
});
