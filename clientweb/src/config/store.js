import { createStore, applyMiddleware, compose} from "redux";
//import { createBrowserHistory } from "history"
//import { routerMiddleware } from "react-router-redux";

//import { logger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "../reducers";

//const history = createBrowserHistory();
const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
