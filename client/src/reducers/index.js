import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import alert from "./alert";
import admin from "./admin";
import classroom from "./classroom";
import events from "./events";
import teacher from "./teacher";
import dashLink from "./navlink";
import school from "./school";
import stream from "./stream";
import student from "./student";
import counter from "./counter";
import upload from "./upload";

export default combineReducers({
  routing: routerReducer,
  dashLink,
  admin,
  alert,
  student,
  school,
  teacher,
  events,
  classroom,
  upload,
  stream,
  counter,
});
