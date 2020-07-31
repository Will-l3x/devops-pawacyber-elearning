import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import Select from "react-select";
import { AdminService } from "../../services/admin";

let options = [];
let del_options = [];

class ClassOptions extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      del_options,
      selectedOption: null,
      classDescription: null,
    };
    this.handleChange.bind(this);
  }

  getClass() {
    var gradeStore = JSON.parse(localStorage.getItem("registrationData"));

    var data = {
      gradeid: gradeStore.gradeid,
      schoolid: "24",
    };

    AdminService.findClassesForSchoolGrade(data)
      .then((response) => {
        for (const classOpt of response) {
          if (classOpt.status === "deleted") {
            del_options.push(classOpt);
          } else {
            classOpt.value = classOpt.classId;
            classOpt.label = classOpt.classname;
            options.push(classOpt);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        options = [];
      });
  }

  componentDidMount() {
    M.AutoInit();

    this.getClass();
  }

  handleChange = (selectedOption) => {
    this.props.onSelectOption(selectedOption);
    this.setState({ selectedOption });
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        classNamePrefix="custom-options"
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default connect(null, null)(ClassOptions);
