import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import Select from "react-select";
import { AdminService } from "../services/admin";

class Tags extends Component {
  constructor() {
    super();
    this.state = {
      options: [],
      selectedOption: null,
      tagDescription: null,
    };
    this.handleChange.bind(this);
  }

  getTag() {
    AdminService.get_all_tags()
      .then((response) => {
        let options = [];
        for (const tag of response) {
          tag.value = tag.tagId;
          tag.label = tag.name;
          if (tag.name === "Advert") {
            //pass
          } else {
            options.push(tag);
          }
        }
        this.setState({ options });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    M.AutoInit();

    this.getTag();
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
        className="form-input "
        value={selectedOption}
        onChange={this.handleChange}
        options={this.state.options}
      />
    );
  }
}

export default connect(null, null)(Tags);
