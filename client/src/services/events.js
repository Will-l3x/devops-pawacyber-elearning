import axios from "axios";
const qs = require("qs");
const token = JSON.parse(localStorage.getItem("token"));
// const apiUrl = "http://localhost:3001/api";

var config = {
  baseURL: "https://pawacyberschool.net/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "https://pawacyberschool.net",
    "Access-Control-Allow-Credentials": true,
  },
};

export const EventService = {
  get_events,
  post_events,
  update_events,
  delete_events,
};
//events
async function get_events(user_id) {
  try {
    let res = await axios(
      `/events/get-user-events/${user_id}`,
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function post_events(user_id, data) {
  try {
    let res = await axios.post(
      `/events/add-user-events/${user_id}`,
      qs.stringify(data),
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function update_events(user_id, data) {
  try {
    let res = await axios.put(
      `/events/update-user-events/${user_id}`,
      qs.stringify(data),
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function delete_events(user_id, event_id) {
  try {
    let res = await axios.delete(
      `/events/delete-user-events/${user_id}/${event_id}`,
      config
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
