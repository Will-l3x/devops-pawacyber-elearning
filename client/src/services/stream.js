import axios from "axios";
const qs = require("qs");
const token = JSON.parse(localStorage.getItem("token"));
// const apiUrl = "http://localhost:3001/api";

var config = {
  baseURL: "https://cybers.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
  },
};

export const StreamService = {
  create_meeting,
  start_meeting,
  stop_meeting,
  get_meetings,
  get_meeting,
};

async function create_meeting(data) {
  try {
    let res = await axios.post(`/create_meeting`, qs.stringify(data), config);
    return res;
  } catch (err) {
    console.error(err);
  }
}
async function start_meeting(id, data) {
  try {
    let res = await axios.put(
      `/start_meeting/${id}`,
      qs.stringify(data),
      config
    );
    return res;
  } catch (err) {
    console.error(err);
  }
}
async function stop_meeting(id) {
  try {
    let res = await axios.put(`/stop_meeting/${id}`, config);
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
}

async function get_meetings() {
  //by class id
  try {
    let res = await axios.get(`/get_meetings`, config);
    return res;
  } catch (err) {
    console.error(err);
  }
}

async function get_meeting(id) {
  //by class id
  try {
    let res = await axios.get(`/get_meeting/${id}`, config);
    return res;
  } catch (err) {
    console.error(err);
  }
}
