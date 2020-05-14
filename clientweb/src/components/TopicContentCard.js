import React, { Component } from "react";
import M from "materialize-css";

export default class TopicContentCard extends Component {
    componentDidMount(){
        M.AutoInit();
    }
  render() {
    var data = this.props.content;
    return (
      <div className="collection-item">
        <span className="badge">
          <a
            className="black-text tooltipped"
            data-position="top"
            data-tooltip="Download pdf"
            target={"_blank"}
            href="http://material.doc_path"
            rel="noopener noreferrer"
          >
            <i className="material-icons">picture_as_pdf</i>
          </a>
          <a
            className="black-text tooltipped"
            target={"_blank"}
            data-position="top"
            data-tooltip="Download video"
            rel="noopener noreferrer"
            href="http://material.video_path"
          >
            <i className="material-icons">ondemand_video</i>
          </a>
        </span>
        <p>{data.topicContent}</p>
      </div>
    );
  }
}
