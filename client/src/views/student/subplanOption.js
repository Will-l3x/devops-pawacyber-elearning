import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import Select from "react-select";
//import { SchoolService } from "../../services/school";
import { AdminService } from "../../services/admin";

let options = [];

//const user = JSON.parse(localStorage.getItem("user"));

AdminService.get_subs_plans()
  .then((response) => {
    for (const sub of response) {
      sub.value = sub.subscriptionId;
      sub.label = sub.subscriptionname;
      options.push(sub);
    }
  })
  .catch((error) => {
    console.log(error);
    options = [];
  });

class SubplanOptions extends Component {
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

export default connect(null, null)(SubplanOptions);