import React, { Component } from "react";
import { connect } from "react-redux";
import M from "materialize-css";
import Select from "react-select";
import { AdminService } from "../../services/admin";

let options = [];

const user = JSON.parse(localStorage.getItem("user"));
if (user === null) {
    options = [];
} else {

    AdminService.get_all_teachers().then((response) => {
        const data = response === undefined ? [] : response;
        for (const teacher of data) {
            teacher.value = teacher.teacherId;
            teacher.label = teacher.lastname + " " + teacher.firstname;
            options.push(teacher);
        }
    }).catch((error) => {
        console.log(error);
        options = [];
    });

}

class TutorOptions extends Component {
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

export default connect(null, null)(TutorOptions);
