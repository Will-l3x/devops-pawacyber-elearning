import React, { Component } from "react";
import { connect } from "react-redux";
import TopicContentCard from "../TopicContentCard";
import { Link, Redirect } from "react-router-dom";
import store from "../../config/store"

class ClassroomCourseCard extends Component {
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
    const link = store.getState().dashLink.link;
    if (course.courseName === "" || course.courseName === undefined) {
      return <Redirect to={`/${link}`} />;
    }
    return (
      <div
        id="task-card3"
        className="col l12"
        style={{ display: "none", marginTop: "2%" }}
      >
        <div className="col s12 m2 l3">
          <ul className="task-card collection with-header">
            <li className="collection-header gradient-45deg-light-blue-cyan ">
              <p className="task-card-title">{course.courseName} TOPICS</p>
            </li>
            {this.state.topics.map((topic, i) => (
              <li key={i} className="collection-item dismissable">
                <label htmlFor="task1">
                  {topic.title}
                  {/* Click to view the content by seting state of Topic Name and the content */}
                  <Link
                    to="#"
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
          <div className="task-card collection with-header">
            <div className="collection-header designed-dots">
              <h5 className="task-card-title" style={{ color: "black" }}>
                {this.topicSelected
                  ? this.contentSate.content.topic
                  : "Select Topic"}
              </h5>
            </div>
            {this.topicSelected ? (
              <TopicContentCard
                content={this.contentSate.content}
              ></TopicContentCard>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  course: state.student,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassroomCourseCard);
