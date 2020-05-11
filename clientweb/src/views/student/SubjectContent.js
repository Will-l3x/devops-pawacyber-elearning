import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import SubjectDescrip from "../../components/student-components/SubjectDescrip";
import store from "../../config/store";

// Receives subject code and Name only from main screen and retrieves from endpoint the topics of that.
export class SubjectContent extends Component {
  state = {
    topics: [
      {
        id: 1,
        title: "Databases",
      },
      {
        id: 2,
        title: "Introduction to Programming",
      },
    ],
  };

  contentSate = {
    content: {
      id: 1,
      topic: "Databases",
      videoLink: "somewhere",
      topicContent: `The quick brown fox jumped over the lazy dogs
              kdkdkd
              dkdkkdkdkkdkdkdkd djd kd wos cne 
              dls`,
    },
  };

  topicSelected = false;

  selectedTopic() {
    this.topicSelected = true;
  }
  

  render() {
    const course = store.getState().student.course;
    return (
      <div className="wrapper">
        <aside id="left-sidebar-nav">
          <SideBar></SideBar>
          <Link
            to=""
            data-target="slide-out"
            className="sidebar-collapse waves-effect dropdown-trigger waves-block waves-light hide-on-large-only"
          >
            <i className="material-icons">format_indent_increase</i>
          </Link>
        </aside>
        <section id="content">
          <div className="container">
            <div style={{ marginTop: "15px" }}>
              <div id="card-widgets">
                <div className="row">
                  <div className="col s12 m2 l3">
                    <ul id="task-card" className="collection with-header">
                      <li className="collection-header gradient-45deg-light-blue-cyan ">
                        <p className="task-card-title">
                          {course.name} TOPICS
                        </p>
                      </li>
                      {this.state.topics.map((topic, i) => (
                        <li key={i} className="collection-item dismissable">
                          <label htmlFor="task1">
                            {topic.title}
                            {/* Click to view the content by seting state of Topic Name and the content */}
                            <Link to="#"
                              onClick={() => this.selectedTopic()}
                              className="secondary-content"
                            >
                              <span className="ultra-small">VIEW</span>
                            </Link>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col s12 m13 l9">
                    <div id="task-card" className="collection with-header">
                      <div className="collection-header designed-dots">
                        <h5
                          className="task-card-title"
                          style={{ color: "black" }}
                        >
                          {this.topicSelected
                            ? this.contentSate.content.topic
                            : "Select Topic"}
                        </h5>
                      </div>
                      {this.topicSelected ? (
                        <SubjectDescrip
                          content={this.contentSate.content}
                        ></SubjectDescrip>
                      ) : (
                          <div></div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}


export default connect(null, null)(SubjectContent);
