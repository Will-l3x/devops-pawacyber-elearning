import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import Select from "react-select";
import { AdminService } from "../../services/admin";

let options = [];

class ClassOptions extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      selectedOption: null,
      classDescription:null
    };
    this.handleChange.bind(this);
  }

  getClass(){
    var data = {
      grade: this.props.grade
    }
    AdminService.get_all_subjects_per_grade(data)
    .then((response) => {
      for (const classOpt of response) {
        classOpt.value = classOpt.classId;
        classOpt.label = classOpt.classname;
        options.push(classOpt);
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
