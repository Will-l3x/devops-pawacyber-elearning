import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import Select from "react-select";
import { StreamService } from "../../services/stream";

let options = [];
StreamService.get_meetings()
  .then((response) => {
    for (const meeting of response.data.data.meetings) {
      meeting.value = meeting.meetingId;
      meeting.label =
        meeting.meetingname === null
          ? `Meeting ${meeting.meetingId}`
          : meeting.meetingname;
      options.push(meeting);
    }
  })
  .catch((error) => {
    options = [];
  });
class MeetingOptions extends Component {
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
      />
    );
  }
}

export default connect(null, null)(MeetingOptions);
