import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import Select from "react-select";
import { AdminService } from "../../services/admin";

let options = [];
 AdminService.get_roles()
  .then((response) => {
    for (const role of response) {
      role.value = role.roleId;
      role.label = role.rolename;
      options.push(role);
    }
  })
  .catch((error) => {
    console.log(error);
    options = [];
  });
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
