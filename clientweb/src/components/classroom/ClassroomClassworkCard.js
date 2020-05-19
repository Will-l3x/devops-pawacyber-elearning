import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ClassroomActions from "../../actions/classroom"
//import store from "../../config/store"
export class ClassroomClassworkCard extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      to: "",
      classwork: [
        {
          id: "1",
          title: "Assignment 1",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "2",
          title: "Test 1",
          type: "Test/Exercise",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "3",
          title: "Exercise 2",
          type: "Test/Exercise",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "4",
          title: "Chapter 6",
          type: "Course material",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "5",
          title: "Assignment 2",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "6",
          title: "Exercise 1",
          type: "Test/Exercise",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "7",
          title: "Assignment 1",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "8",
          title: "Chapter 3 & 4",
          type: "Course material",
          due: "18 May",
          posted: "18 May",
        },
      ],
    };
  }
  componentDidMount() {
    this.setState({
      classwork: [
        {
          id: "1",
          title: "Assignment 1",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "2",
          title: "Test 1",
          type: "Test/Exercise",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "3",
          title: "Exercise 2",
          type: "Test/Exercise",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "4",
          title: "Chapter 6",
          type: "Course material",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "5",
          title: "Assignment 2",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "6",
          title: "Exercise 1",
          type: "Test/Exercise",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "7",
          title: "Assignment 1",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        },
        {
          id: "8",
          title: "Chapter 3 & 4",
          type: "Course material",
          due: "18 May",
          posted: "18 May",
        },
      ],
    });

  }
  handleDeleteItem(id) {
    let classwork = [];
    for (const item of this.state.classwork) {
      if (item.id === id) {
        console.log(item);
      } else {
        classwork.push(item);
      }
    }
    this.setState({
      classwork,
    });
  }

  render() {
    console.log(this.props)
    return (
      <ul
        id="task-card1"
        className="collection task-card"
        style={{ display: "block", marginTop: "3%" }}
      >
        {this.state.classwork.map((cw, i) => {
          let cl = "";
          if (cw.type === "Course material") {
            return (
              <li key={cw.id} className="collection-item ">
                <label>
                  {cw.title}
                  <Link to="" className="secondary-content">
                    <span className="ultra-small">Posted {cw.posted}</span>
                  </Link>
                </label>
                <span className="task-cat cyan">{cw.type}</span>
                <label className="right">
                  <span>
                    <i
                      className="material-icons remove-content"
                      data-id={cw.id}
                      onClick={() => {
                        this.handleDeleteItem(cw.id);
                      }}
                    >
                      delete_forever
                    </i>
                  </span>
                </label>
              </li>
            );
          }
          if (cw.type === "Assignment") {
            cl = "teal accent-4";
          } else {
            cl = "red accent-2";
          }
          return (
            <li key={cw.id} className="collection-item">
              <label>
                {cw.title}
                <Link to="" className="secondary-content">
                  <span className="ultra-small">Due {cw.due}</span>
                </Link>
              </label>
              <span className={`task-cat ${cl}`}>{cw.type}</span>
              <label className="right">
                <span>
                  <i
                    onClick={() => this.handleDeleteItem(cw.id)}
                    data-id={cw.id}
                    className="material-icons remove-content"
                  >
                    delete_forever
                  </i>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
  files: state.fileUpload,
});

const mapDispatchToProps = Object.assign({}, ClassroomActions);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassroomClassworkCard);
