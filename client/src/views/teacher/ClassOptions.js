import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import Select from "react-select";
import { TeacherService } from "../../services/teacher";
let options = [];

const user = JSON.parse(localStorage.getItem("user"));
if (user === null) {
  options = [];
} else {
  TeacherService.get_all_courses(user.userid)
    .then((response) => {
      const data = response === undefined ? [] : response;
      for (const option of data) {
        option.value = option.classId;
        option.label = option.classname;
        options.push(option);
      }
    })
    .catch((error) => {
      console.log(error);
      options = [];
    });
}

class ClassOptions extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      selectedOption: null,
    };
    this.handleChange.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
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
        className="form-input"
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        required
      />
    );
  }
}

export default connect(null, null)(ClassOptions);
