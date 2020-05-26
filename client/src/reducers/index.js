import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import admin from "./admin";
import classroom from "./classroom";
import events from "./events";
import teacher from "./teacher";
import dashLink from "./navlink";
import school from "./school";
import student from "./student";
import counter from "./counter";
import upload from "./upload";

export default combineReducers({
  routing: routerReducer,
  dashLink,
  admin,
  student,
  school,
  teacher,
  events,
  classroom,
  upload,
  counter,
});
