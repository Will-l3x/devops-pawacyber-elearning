import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import Select from "react-select";
import { AdminService } from "../../services/admin";

let options = [];

 AdminService.get_all_classes()
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

export default connect(null, null)(ClassOptions);
