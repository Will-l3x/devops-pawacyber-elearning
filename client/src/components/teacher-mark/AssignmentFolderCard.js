import React, { Component } from "react";
import { connect } from "react-redux";
import folderIcon from "../../assets/images/icon/folder.svg";
import { Redirect } from "react-router";

export class AssignmentFolderCard extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      to: "",
      students: [
        {
          id: "2",
          title: "Assignment 1",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "3",
          title: "Assignment 2",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "6",
          title: "Assignment 3",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
      ],
    };
    this.handleFolderClick.bind(this);
  }

  handleFolderClick = () => {
    this.setState({
      redirect: true,
    });
  };
  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/classroom-mark-assignment" />;
    }
    return (
      <div
        id="task-card2"
        className="row"
        style={{ display: "none", marginTop: "4%" }}
      >
        {this.state.students.map((st, i) => (
          <div key={i} className="col s12 m4 l3 padding-5px">
            <div className="folder-container">
              <div
                onClick={this.handleFolderClick}
                className="folder cursor-pointer center-align"
              >
                <div className=" left folder-icon">
                  <img src={folderIcon} className="icon" alt="folder" />
                </div>
                <div className="center-align left folder-name">
                  <h6>{st.title}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentFolderCard);
