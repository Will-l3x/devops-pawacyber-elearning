import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './config/store';
import Main from "./navigation/main";
import "materialize-css/dist/css/materialize.min.css";
import M from 'materialize-css';

class App extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Main/>
        </div>
      </Provider>
    );
  }
}

export default App;