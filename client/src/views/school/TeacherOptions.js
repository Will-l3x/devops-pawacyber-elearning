import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import Select from "react-select";
import { SchoolService } from "../../services/school";

let options = [];
const user = JSON.parse(localStorage.getItem("user"));
if (user !== null) {
  SchoolService.get_all_teachers(user.schoolid)
    .then((response) => {
      for (const teacher of response) {
        teacher.value = teacher.id;
        teacher.label = teacher.teachername;
        options.push(teacher);
      }
    })
    .catch((error) => {
      console.log(error);
      options = [];
    });
}

class RoleOptions extends Component {
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
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default connect(null, null)(RoleOptions);
