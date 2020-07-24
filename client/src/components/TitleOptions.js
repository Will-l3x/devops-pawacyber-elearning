import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import Select from "react-select";

let options = [
  { value: "Dr", label: "Dr" },
  { value: "Mr", label: "Mr" },
  { value: "Mrs", label: "Mrs" },
  { value: "Rev", label: "Rev" },
];
class TitleOptions extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      selectedTitle: null,
    };
    this.handleChange.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
  }

  handleChange = (selectedTitle) => {
    this.props.onSelectTitle(selectedTitle);
    this.setState({ selectedTitle });
  };
  render() {
    const { selectedTitle } = this.state;

    return (
      <Select
        classNamePrefix="custom-options"
        value={selectedTitle}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default connect(null, null)(TitleOptions);
