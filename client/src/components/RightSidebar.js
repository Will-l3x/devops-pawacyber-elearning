import React, { Component } from "react";
import { connect } from "react-redux";
import { ChatFeed, Message } from "react-chat-ui";

export class RightSidebar extends Component {
  constructor() {
    super();
    this.state = {
      viewChat: false,
      istyping: false,
      messages: [
        new Message({
          id: 1,
          message: "I'm the recipient! (The person you're talking to)",
        }), // Gray bubble
        new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
      ],
    };
    this.viewChat = this.viewChat.bind(this);
  }
  viewChat(e) {
    e.preventDefault();
    this.setState({ viewChat: true });
  }
  render() {
    if (this.state.viewChat) {
      return (
        <aside id="right-sidebar-nav">
          <ul
            id="chat-out"
            className="side-nav rightside-navigation right-aligned ps-container ps-active-y translateX-0"
          >
            <li className="li-hover">
              <div className="row">
                <div className="col s12">
                  <ul className="">
                    <li className="col s12">
                      <a href="#chatapp" className="active">
                        Elizabeth Elliott
                      </a>
                    </li>
                  </ul>
                </div>
                <div id="chatapp" className="col s12 no-padding">
                  <div className="scrollbar" id="style-7">
                    <div className="chat-messages">
                      <div className="message-container z-depth-5 left green accent-3">
                        <span>You</span>
                        <p className="white-text">
                          I'm the recipient! (The person you're talking to) I'm
                          the recipient! (The person you're talking to) I'm the
                          recipient! (The person you're talking to) I'm the
                          recipient! (The person you're talking to)
                        </p>
                      </div>
                      <div className="message-container z-depth-5 right blue accent-2">
                        <p className="white-text">
                          I'm you -- the blue bubble!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </aside>
      );
    }
    return (
      <aside id="right-sidebar-nav">
        <ul
          id="chat-out"
          className="side-nav rightside-navigation right-aligned ps-container ps-active-y display-none"
        >
          <li className="li-hover">
            <div className="row">
              <div className="col s12 border-bottom-1 mt-5">
                <ul className="">
                  <li className="col s12">
                    <a href="#chatapp" className="active">
                      CHATS
                    </a>
                  </li>
                </ul>
              </div>
              <div id="chatapp" className="col s12">
                <div className="collection border-none">
                  <a
                    href="#!"
                    onClick={this.viewChat}
                    className="collection-item avatar border-none"
                  >
                    <img
                      src="images/avatar/avatar-1.png"
                      alt=""
                      className="circle cyan"
                    />
                    <span className="line-height-0">Elizabeth Elliott </span>
                    <span className="medium-small right blue-grey-text text-lighten-3">
                      5.00 AM
                    </span>
                    <p className="medium-small blue-grey-text text-lighten-3">
                      Thank you{" "}
                    </p>
                  </a>
                  <a href="#!" className="collection-item avatar border-none">
                    <img
                      src="images/avatar/avatar-2.png"
                      alt=""
                      className="circle deep-orange accent-2"
                    />
                    <span className="line-height-0">Mary Adams </span>
                    <span className="medium-small right blue-grey-text text-lighten-3">
                      4.14 AM
                    </span>
                    <p className="medium-small blue-grey-text text-lighten-3">
                      Hello Boo{" "}
                    </p>
                  </a>
                  <a href="#!" className="collection-item avatar border-none">
                    <img
                      src="images/avatar/avatar-3.png"
                      alt=""
                      className="circle teal accent-4"
                    />
                    <span className="line-height-0">Caleb Richards </span>
                    <span className="medium-small right blue-grey-text text-lighten-3">
                      9.00 PM
                    </span>
                    <p className="medium-small blue-grey-text text-lighten-3">
                      Keny !{" "}
                    </p>
                  </a>
                </div>
              </div>{" "}
            </div>
          </li>
        </ul>
      </aside>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RightSidebar);
