import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import Select from "react-select";
import { AdminService } from "../../services/admin";

let options = [];

AdminService.get_subs_plans()
  .then((response) => {
    for (const subplan of response) {
      subplan.value = subplan.price;
      subplan.label = subplan.subscriptionname + " [Grade: " + subplan.mingrade + " to " + subplan.maxgrade + ']  - N$' + subplan.price;
      options.push(subplan);
    }
  })
  .catch((error) => {
    console.log(error);
    options = [];
  });

class subplanOptions extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      selectedOption: null,
      packageDescription: null
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

export default connect(null, null)(subplanOptions);
