import React, { Component } from "react";
import { connect } from "react-redux";
import ClassworkItem from "./ClassworkItem";

//import store from "../../config/store"
export class ClassroomClassworkCard extends Component {
  render() {
    return <ClassworkItem />;
  }
}

export default connect(null, null)(ClassroomClassworkCard);
