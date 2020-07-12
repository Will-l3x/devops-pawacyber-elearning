import axios from 'axios';

const apiUrl = "http://cybers.azurewebsites.net/api";
// const apiUrl = "http://localhost:3001/api";

export const EventService = {
  get_events,
  post_events,
  update_events,
  delete_events,
};
//events
async function get_events(user_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/events/get-user-events/${user_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function post_events(user_id, data) {
 try {
    let res = await axios({
      url: `${apiUrl}/events/add-user-events/${user_id}`,
      method: "post",
      data,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function update_events(user_id, data) {
 try {
    let res = await axios({
      url: `${apiUrl}/events/update-user-events/${user_id}`,
      method: "put",
      data,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function delete_events(user_id, event_id) {
 try {
    let res = await axios({
      url: `${apiUrl}/events/delete-user-events/${user_id}/${event_id}`,
      method: "delete",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json"
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}