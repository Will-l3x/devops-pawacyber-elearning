import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import SideBar from "./SideBar";
//import $ from "jquery";
import M from "materialize-css";
import FileDropZone from "./dropzone";
import TopicContentCard from "./TopicContentCard";
import Footer from "./footer";
import Header from "./header";
// import store from "../config/store";

import AdminActions from "../actions/admin";
import { AdminService } from "../services/admin";

class CourseOutlineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      course: {
        id: "1",
        title: "Course Name",
      },
      topics: [
        {
          id: "1.1",
          title: "Topic 1",
          content: {
            id: 1,
            topic: "Databases",
            videoLink: "somewhere",
            topicContent:
              "The quick brown fox jumped over the lazy dogs kdkdkd  dkdkkdkdkkdkdkdkd djd kd wos cne   dlshe quick brown fox jumped over the lazy dogs kdkdkd  dkdkkdkdkkdkdkdkd djd kd wos cne   dls",
          },
          material: [
            {
              id: "1",
              title: "Course Intro",
              period: "week 1",
              doc_path: "path/to/file",
              video_path: "path/to/file",
            },
            {
              id: "11",
              title: "Course Intro",
              period: "week 2",
              doc_path: "path/to/file",
              video_path: "path/to/file",
            },
          ],
        },
        {
          id: "1.2",
          title: "Topic 2",
          content: {
            id: 1,
            topic: "Databases",
            videoLink: "somewhere",
            topicContent:
              "The quick brown fox jumped over the lazy dogs kdkdkd  dkdkkdkdkkdkdkdkd djd kd wos cne   dlshe quick brown fox jumped over the lazy dogs kdkdkd  dkdkkdkdkkdkdkdkd djd kd wos cne   dls",
          },
          material: [
            {
              id: "2",
              title: "Course Intro",
              period: "week 3 & 4",
              doc_path: "path/to/file",
              video_path: "path/to/file",
            },
            {
              id: "12",
              title: "Course Intro",
              period: "week 5",
              doc_path: "path/to/file",
              video_path: "path/to/file",
            },
          ],
        },
        {
          id: "1.3",
          title: "Topic 3",
          content: {
            id: 1,
            topic: "Databases",
            videoLink: "somewhere",
            topicContent:
              "The quick brown fox jumped over the lazy dogs kdkdkd  dkdkkdkdkkdkdkdkd djd kd wos cne   dlshe quick brown fox jumped over the lazy dogs kdkdkd  dkdkkdkdkkdkdkdkd djd kd wos cne   dls",
          },
          material: [
            {
              id: "3",
              title: "Course Intro",
              period: "week 6-9",
              doc_path: "path/to/file",
              video_path: "path/to/file",
            },
            {
              id: "13",
              title: "Course Intro",
              period: "week 10",
              doc_path: "path/to/file",
              video_path: "path/to/file",
            },
          ],
        },
      ],
    };
    this.handleDeleteContent.bind(this);
  }
  contentSate = {
    content: {
      id: 1,
      topic: "Databases",
      videoLink: "somewhere",
      topicContent: `The quick brown fox jumped over the lazy dogs kdkdkd  dkdkkdkdkkdkdkdkd djd kd wos cne   dlshe quick brown 
        fox jumped over the lazy dogs kdkdkd  dkdkkdkdkkdkdkdkd djd kd wos cne   dls Lorem ipsum door sit amet, fugiat deicata avise id cum,
         no quo maiorum intel ogrets geuiat operts elicata libere avisse id cumlegebat, liber regione eu sit....
         Lorem ipsum door sit amet, fugiat deicata avise id cum, no quo maiorum intel ogrets geuiat operts elicata libere avisse id cumlegebat, liber regione eu sit....
         Lorem ipsum door sit amet, fugiat deicata avise id cum, no quo maiorum intel ogrets geuiat operts elicata libere avisse id cumlegebat, liber regione eu sit....`,
    },
  };

  topicSelected = false;
  disabled = true;
  componentDidMount() {
    M.AutoInit();
    const course = JSON.parse(sessionStorage.getItem("course"));
    this.setState({ course });
    this.get_topics(course.id);
  }
  get_topics = (id) => {
    AdminService.get_courses(id).then((response) => {
      if (response === undefined) {
        this.setState({
          courses: [],
        });
      } else {
        let pages = [];
        let perPage = 6;
        const totalPageCount = Math.ceil(response.data.length / perPage);

        for (var i = 1; i <= totalPageCount; i++) {
          pages.push(i);
          this.setState({ pages });
        }

        const courses = this.pageArraySplit(response.data, {
          currentPageNumber: this.state.currentPageNumber,
          perPage,
        });
        this.setState({ courses });
      }
    });
  };

  handleValidation = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["title"]) {
      formIsValid = false;
      errors["title"] = "Cannot be empty!";
    }
    if (!fields["description"]) {
      formIsValid = false;
      errors["description"] = "Cannot be empty!";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };
  handleAddTopic = (event) => {
    event.preventDefault();
    let fileData = this.state.files;
    var data = {
      classid: this.state.course.id,
      name: event.target.name.value,
      description: event.target.description.value,
    };

    AdminService.post_new_topic(data).then((response) => {
      if (response === undefined) {
        alert("Resource Upload failed");
      } else if (response.err) {
        alert(response.err);
      } else if (response.success === true) {
        const uploadData = new FormData();
        uploadData.append("file", fileData.file);
        uploadData.append("uploadType", response.uploadType);
        uploadData.append("uploadType", response.uploadId);

        AdminService.post_file(uploadData).then((response) => {
          this.props.get_all_courses(1);
          this.handleFileClear();
        });

        document.getElementById("sibs").reset();
        this.getDashData();
      } else {
        alert(response.message);
      }
    });
  };
  selectedTopic() {
    this.topicSelected = true;
  }

  handleDeleteContent = (e) => {
    const topic = e.target.value;

    if (topic === "Select a Topic") {
      M.toast({
        html: "Please select a topic",
        classes: "red accent-2",
      });
    } else {
      for (const topik of this.state.topics) {
        if (topik.title === topic) {
          AdminActions.get_topic_content(topik);
        }
      }
      this.setState({ redirect: true });
    }
  };

  render() {
    if (
      this.state.redirect ||
      this.state.course === undefined ||
      this.state.course === null
    ) {
      return <Redirect to="/courses" />;
    }
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          {" "}
          <div className="wrapper">
            <SideBar />

            <section id="content">
              <div className="container">
                <div className="course-item">
                  <div className="all-title-box2">
                    <div className="container">
                      <h1 className="center-align flow-text">
                        List of Course content
                      </h1>
                    </div>
                  </div>
                  <div id="breadcrumbs-wrapper">
                    <div className="row">
                      <div className="col s10 m6 l6">
                        <h2 className="breadcrumbs-title text-darken-2">
                          Course Outline
                        </h2>
                        <ol className="breadcrumbs">
                          <li>
                            <Link to="/courses">Course List</Link>
                          </li>
                          <li className="active">{this.state.course.name}</li>
                        </ol>
                      </div>
                      <div className="col s2 m6 l6">
                        <Link
                          to="#!"
                          className="tooltipped modal-trigger waves-effect black-text right"
                          data-target="modal7"
                          data-tooltip="Add New Topic"
                          style={{ marginTop: "3%" }}
                        >
                          <i className="material-icons">library_add</i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="course-br">
                    <div className="course-title">
                      <h2>
                        <Link to="" title="">
                          Course introduction
                        </Link>
                      </h2>
                    </div>
                    <div className="course-desc">
                      <p>
                        Lorem ipsum door sit amet, fugiat deicata avise id cum,
                        no quo maiorum intel ogrets geuiat operts elicata libere
                        avisse id cumlegebat, liber regione eu sit....
                      </p>
                    </div>
                  </div>
                  <div className="course-meta-bot">
                    <ul>
                      <li>
                        <i className="fa fa-calendar" aria-hidden="true"></i> 6
                        Month
                      </li>
                      <li>
                        <i
                          className="fa fa-youtube-play"
                          aria-hidden="true"
                        ></i>{" "}
                        56 Video Tutorials
                      </li>
                      <li>
                        <i className="fa fa-book" aria-hidden="true"></i>
                        {this.state.topics.length}
                        Topics
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card">
                  <div className="row">
                    <div className="col s12 m2 l3">
                      <ul className="task-card collection with-header">
                        <li className="collection-header gradient-45deg-light-blue-cyan ">
                          <p className="task-card-title">
                            {this.state.course.title} TOPICS
                          </p>
                        </li>
                        {this.state.topics.map((topic, i) => (
                          <li key={i} className="collection-item dismissable">
                            <label htmlFor="task1">
                              {topic.title}
                              {/* Click to view the content by seting state of Topic Name and the content */}
                              <Link
                                to="#"
                                onClick={() => this.selectedTopic(topic)}
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
                          <TopicContentCard
                            content={this.contentSate.content}
                          ></TopicContentCard>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div id="modal7" className="modal">
                  <div className="modal-content">
                    <h4 className="header2">Add Course Topic</h4>
                    <div className="row">
                      <div className="col s12">
                        <div className="row">
                          <div className="input-field col s4">
                            <input id="title" type="text"></input>
                            <label htmlFor="title">Title</label>
                          </div>
                          <div className="input-field col s4">
                            <input id="duaration" type="text"></input>
                            <label htmlFor="duaration">Duration(weeks)</label>
                          </div>
                        </div>

                        <div className="row">
                          <div className="input-field col s12">
                            <FileDropZone input_id="file1" />
                          </div>
                          <div className="row">
                            <div className="input-field col s12">
                              <button className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right">
                                Submit
                                <i className="material-icons right">send</i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan">
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = Object.assign({}, AdminActions);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseOutlineScreen);
