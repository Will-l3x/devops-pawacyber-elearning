const apiUrl = "http://loaclhost:3000/api";

export const AdminService = {
  get_all_courses,
  add_course,
  delete_course,
  get_course_material,
  post_topic_material,
  update_topic_material,
  get_all_teachers,
  post_teacher,
  update_teacher,
  get_admin_events,
  post_admin_events,
};

// course functions
function get_all_courses() {
  const requestOptions = {
    method: "GET",
  };
  //every course offered by the company
  return fetch(`${apiUrl}/admin/get_classes`, requestOptions).then(
    handleResponse
  );
}
function add_course(course) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  };
  /**
   * {
   * title: 'course title,
   * short_descrip: 'short description'
   * course_duration: '6', //in months
   * nun_of_topics: '28',
   * num_of_videos: '20', //can change if new vid is uploaded
   * }
   */

  return fetch(`${apiUrl}/admin/get_classes`, requestOptions).then(
    handleResponse
  );
}
function delete_course(id) {
  const requestOptions = {
    method: "DELETE",
  };
  return fetch(`${apiUrl}/delete-course/${id}`, requestOptions).then(
    handleResponse
  );
}
function get_course_material(id) {
  const requestOptions = {
    method: "GET",
  };

  /**
   *   {
          title: "Course Name",
          short_descrip: 'short description'
          intro: "fdfd",                       //description about te course
          course_duration: '6', //in months
          nun_of_topics: '28', 
          num_of_videos: '20', //can change if new vid is uploaded
          topics: [
              {
                  "id": 'id',
                  title: 'Topic Title',
                  content: 'The text content',
                  path_to_document: 'path_to_document', //if content is downloadable
                  path_to_video: 'path_to_video', //if content is downloadable
              }
          ]
          
        }
   */

  return fetch(
    `${apiUrl}/admin/get_course/${id}/material`,
    requestOptions
  ).then(handleResponse);
}
function post_topic_material(id) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(events),
  };
  /**
     * {
            title: 'Topic Title',
            content: 'The text content',
            path_to_document: 'path_to_document', //if content is downloadable
            path_to_video: 'path_to_video', //if content is downloadable
        }
     */
  return fetch(
    `${apiUrl}/admin/post-topic-material/${id}`,
    requestOptions
  ).then(handleResponse);
}
function update_topic_material(id) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(events),
  };
  /**
     * {
            content: 'The text content', //new content
            path_to_document: 'path_to_document', //new document (I am a file)
            path_to_video: 'path_to_video', //new video (I am a file)
        }
     */
  return fetch(
    `${apiUrl}/admin/update-topic-material/${id}`,
    requestOptions
  ).then(handleResponse);
}

// teacher functions
function get_all_teachers() {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${apiUrl}/admin/get_teachers/${id}`, requestOptions).then(
    handleResponse
  );
}
function post_teacher(teacher) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teacher),
  };
  /**
   * {
   *   id:'Teacher Id',
   *   firstname: 'firstname',
   *   lastname: 'lastname',
   *   school: 'school teacher belong to'
   *   courses:	[Classes the teacher is teaching]  eg 'Mathematics Grade 4A'
   * }
   */
  return fetch(`${apiUrl}/admin/post_teacher/`, requestOptions).then(
    handleResponse
  );
}
function update_teacher(teacher) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teacher),
  };
  /**
   * {
   *   school: 'school teacher belong to'    //new -> teacher tranfered
   *   courses:	[Classes the teacher is teaching] //new class
   * }
   */
  return fetch(`${apiUrl}/admin/update_teacher/`, requestOptions).then(
    handleResponse
  );
}
function get_admin_events() {
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
  return fetch(`${apiUrl}/admin/get_events/${id}`, requestOptions).then(
    handleResponse
  );
}
function post_admin_events(events) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(events),
  };

  return fetch(`${apiUrl}/admin/post_events/${id}`, requestOptions).then(
    handleResponse
  );
}

// handle response
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
