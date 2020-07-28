import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class ClassroomScreen extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      to: "",
      students: [
        {
          id: "H163898D",
          name: "Shingie Bishi",
          class: "Comp Scie",
        },
        {
          id: "2",
          name: "Nu J Twork",
          class: "URL",
        },
        {
          id: "H12213D",
          name: "Will Zhira",
          class: "Comp Scie 4",
        },
        {
          id: "H16038H",
          name: "Kelvin Chelenje",
          class: "Comp Scie 4",
        },
        {
          id: "H150335Y",
          name: "Rum Nitty",
          class: "URL",
        },
      ],
    };
  }
  componentDidMount() {
    this.setState({
      students: [
        {
          id: "H163898D",
          name: "Shingie Bishi",
          class: "Comp Scie",
        },
        {
          id: "2",
          name: "Nu J Twork",
          class: "URL",
        },
        {
          id: "H12213D",
          name: "Will Zhira",
          class: "Comp Scie 4",
        },
        {
          id: "H16038H",
          name: "Kelvin Chelenje",
          class: "Comp Scie 4",
        },
        {
          id: "H150335Y",
          name: "Rum Nitty",
          class: "URL",
        },
      ],
    });
   
  }
  render() {
    return (
      <ul
        id="task-card2"
        className="collection task-card"
        style={{ display: "none", marginTop: "3%" }}
      >
        {this.state.students.map((st, i) => (
          <li key={i} className="collection-item">
            <label>
              {st.name}
              <Link to="" className="secondary-content">
                <span className="ultra-small">Class {st.class}</span>
              </Link>
            </label>
            <span className="task-cat cyan">{st.id}</span>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomScreen);
