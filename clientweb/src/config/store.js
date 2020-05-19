import { createStore, applyMiddleware} from "redux";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

import { logger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "../reducers";

const history = createHistory();
const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware, logger, routerMiddleware(history))
);

export default store;
