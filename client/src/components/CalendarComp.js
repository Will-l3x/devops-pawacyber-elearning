import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import M from "materialize-css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayGridMonthPlugin from "@fullcalendar/daygrid";
import dayGridWeekPlugin from "@fullcalendar/daygrid";
import dayGridDayPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import EventActions from "../actions/events";

export class CalendarComp extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      events: [],
      strDate: "",
    };
    this.onDateClick.bind(this);
    this.saveEventHandler.bind(this);
    this.get_user_events.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({
      user,
    });
    this.get_user_events();
  }
  get_user_events = async () => {
    //const user = JSON.parse(localStorage.getItem("user"));
    //await this.props.get_events(user.username);
    this.addEvents(this.props.eventState.events);
  };
  onDateClick = (info) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    this.setState({
      strDate:
        months[info.date.getMonth()] +
        " " +
        info.date.getDate() +
        ", " +
        info.date.getFullYear(),
    });
    let elem = document.getElementById("event-details");
    let modal = new M.Modal(elem);
    modal.open();
  };
  saveEventHandler = async () => {
    const start_date = $("#start-date").val();
    const start_time = $("#start-time").val();
    const end_date = $("#end-date").val();
    const end_time = $("#end-time").val();
    const start = new Date(start_date + " " + start_time).toISOString();
    const end = new Date(end_date + " " + end_time).toISOString();

    const event = {
      title: $("#title").val(),
      description: $("#description").val(),
      start,
      end,
    };
    this.addEvents(event);
    //await this.props.post_events("user_id", event);
    //this.get_user_events();
    /**
     *  console.log(start, end)
    M.toast({
      html: "Failed. End date > Start date!",
      classes: "red accent-2",
    });

     */

    // for now save events then reload component
  };

  addEvents = (event) => {
    this.setState({ events: this.state.events.concat(event) });
  };
  render() {
    return (
      <div>
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: "prev, next, today",
            center: "title",
            right: "dayGridMonth, timeGridWeek, timeGridDay, list",
          }}
          plugins={[
            dayGridPlugin,
            dayGridDayPlugin,
            dayGridWeekPlugin,
            dayGridMonthPlugin,
            listPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          editable={true}
          events={this.state.events}
        />
        <div id="event-details" className="modal">
          <div className="modal-content">
            <h4 className="header2">Event Details</h4>
            <div className="row">
              <div className="col s12">
                <div className="row">
                  <div className="col s6">
                    <div className="row">
                      <div className="input-field col s6">
                        <input id="title" type="text"></input>
                        <label htmlFor="title">Title</label>
                      </div>
                      <div className="input-field col s6">
                        <select id="type">
                          <option disabled>Type</option>
                          <option defaultValue="event">Event</option>
                          <option defaultValue="reminder">To-do</option>
                          <option defaultValue="to-do">Reminder</option>
                        </select>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s6">
                        <input
                          id="start-date"
                          className=""
                          placeholder={this.state.strDate}
                          defaultValue={this.state.strDate}
                          type="text"
                        ></input>
                        <label htmlFor="start-date">Start Date</label>
                      </div>
                      <div className="input-field col s6">
                        <input
                          id="start-time"
                          className="timepicker"
                          type="text"
                        ></input>
                        <label htmlFor="start-time">Start Time</label>
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s6">
                        <input
                          id="end-date"
                          className="datepicker"
                          type="text"
                        ></input>
                        <label htmlFor="end-date">End Date</label>
                      </div>
                      <div className="input-field col s6">
                        <input
                          id="end-time"
                          className="timepicker"
                          type="text"
                        ></input>
                        <label htmlFor="end-time">End Time</label>
                      </div>
                    </div>
                  </div>
                  <div className="input-field col s6">
                    <input id="description" type="text"></input>
                    <label htmlFor="description">Description</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s4 offset-s8">
                    <button className="btn gradient-45deg-red-pink modal-close waves-effect waves-light">
                      Cancel
                      <i className="material-icons right">cancel</i>
                    </button>
                    <button
                      onClick={this.saveEventHandler}
                      className="btn gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right"
                    >
                      Save
                      <i className="material-icons right">save</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  eventState: state.events,
});

const mapDispatchToProps = Object.assign({}, EventActions);

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComp);
