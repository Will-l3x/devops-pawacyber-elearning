import React, { Component } from "react";
import { connect } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import $ from "jquery";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: "json",
      success: (data) => {
        this.setState({ data: data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      },
    });
  }
  componentDidMount() {
    this.loadCommentsFromServer();

    // Disabled Polling because the 'server' never updates
    // it is just a static file with two comments
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }
  handleCommentSubmit(comment) {
    let comments = this.state.data;

    let newComments = comments.concat([comment]);

    this.setState({
      data: newComments,
    });
    // Post comment
    // $.ajax({
    //   url: this.props.url,
    //   dataType: "json",
    //   type: "POST",
    //   data: comment,
    //   success: (data) => {
    //     this.setState({ data: data });
    //   },
    //   error: (xhr, status, err) => {
    //     console.error(this.proprs.url, status, err.toString());
    //   },
    // });
  }
  handleDelete(index) {
    let comments = this.state.data;

    comments.splice(index, 1);

    this.setState({
      data: comments,
    });
  }
  render() {
    return (
      <div className="col s10 offset-s1">
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentList data={this.state.data} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

class CommentForm extends Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      text: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    console.log(this.state);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text) {
      return;
    }
    this.props.onCommentSubmit({
      author: this.state.user.username,
      text: this.state.text.trim(),
    });
    document.getElementById("commentForm").reset();
    this.setState({
      text: "",
    });
    return;
  }
  render() {
    return (
      <div className="row">
        <div className="col s2 center-align white-text">
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar>{this.state.user.username.charAt(0)}</Avatar>
          </StyledBadge>
        </div>
        <form
          id="commentForm"
          onSubmit={this.handleSubmit}
          className="col s10 Container"
        >
          <div className="col s12">
            <input
              type="text"
              placeholder="Say something..."
              name="text"
              onChange={this.onChange}
              ref="text"
            />
          </div>
          <div className="col s12">
            <input
              type="submit"
              className="gradient-45deg-semi-dark white-text"
              value="Post"
            />
          </div>
        </form>
      </div>
    );
  }
}

class CommentList extends Component {
  render() {
    let handleDelete = this.props.handleDelete;

    let commentNodes = this.props.data.map((comment, i) => {
      return (
        <Comment
          author={comment.author}
          key={i}
          handleDelete={handleDelete}
          comment={comment.text}
        />
      );
    });
    return (
      <TransitionGroup className="example">{commentNodes}</TransitionGroup>
    );
  }
}

class Comment extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete() {
    this.props.handleDelete(this.props.key);
  }
  getNamePrefix(firstName, lastName) {
    return (firstName.substr(0, 1) + lastName.substr(0, 1)).toUpperCase();
  }
  render() {
    return (
      <div key={this.props.key} className="row">
        <div className="col s2 center-align recent-activity-list-icon">
          <Avatar>
            {this.getNamePrefix(this.props.author, " " /*lastname*/)}
          </Avatar>
        </div>
        <div className="col s10 Container">
          <div className="col s12">
            {/* <span className="close right" onClick={this.handleDelete}>
              <i className="fa fa-trash" />
            </span> */}
            <span className="left">{this.props.author}</span>
          </div>
          <div className="col s12 Comment">{this.props.comment}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);
