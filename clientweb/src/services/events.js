const apiUrl = "http://loaclhost:3000/api";

export const EventService = {
  get_events,
  post_events,
};
//events
function get_events(user_id) {
  const requestOptions = {
    method: "GET",
  };

  /**
   *   {
          title: "event 1",
          description: "fdfd",
          end: "2020-05-14T11:10:00.000Z",
          start: "2020-05-13T11:10:00.000Z",
          
        }
   */

  return fetch(`${apiUrl}/get_events/${user_id}`, requestOptions).then(
    handleResponse
  );
}
function post_events(events) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(events),
  };

  return fetch(`${apiUrl}/post_events`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
