import React, { Component } from "react";
import { connect } from "react-redux";
import CalendarComp  from "./CalendarComp";
// import store from "../config/store";
export class Calendar extends Component {

  render() {
    return (
      <div>
        <CalendarComp/>
       </div>
    );
  }
}

export default connect(null, null)(Calendar);
