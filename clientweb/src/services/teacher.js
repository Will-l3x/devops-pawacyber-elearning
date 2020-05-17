const apiUrl = "http://loaclhost:3000/api";

export const TeacherService = {
  get_all_courses,
  get_course_classroom_students_assessment,
  get_course_classroom_classwork,
  get_teacher_events,
  post_teacher_events,
  post_course_classwork,
  delete_course_classwork,
};

// classroom
function get_all_courses() {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${apiUrl}/teacher/get_classes`, requestOptions).then(
    handleResponse
  );
}
function get_course_classroom_classwork(id) {
  const requestOptions = {
    method: "GET",
  };
  /*  example of classwork
       {
          id: "1",
          title: "Assignment 1",
          type: "Assignment",
          due: "18 May",
          posted: "18 May",
        }
    */

  return fetch(`${apiUrl}/teacher/get_classes/${id}`, requestOptions).then(
    handleResponse
  );
}
function get_course_classroom_students_assessment() {
  const requestOptions = {
    method: "GET",
  };
  /** example obj
   *    {
            id: "student id 1",
            name: "Student Name",
            program: "comp scie", // Grade 1B
            course: "coursename",
            test: "100",
            assignment: "100",
            avg: "100",
            grade: "Distinction",
          },
   */
  return fetch(`${apiUrl}/teacher/get_classes/`, requestOptions).then(
    handleResponse
  );
}
function post_course_classwork(cw) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: cw,
  };
  /**
   *  {
   *    title: 'test 1',
   *    duration: '120',  //in minutes
   *    due: '2020-05-14T11:10:00.000Z',
   *    posted: '2020-05-14T11:10:00.000Z',
   *  }
   */
  return fetch(`${apiUrl}/post-classwork`, requestOptions).then(
    handleResponse
  );
}
function delete_course_classwork(id) {
  const requestOptions = {
    method: "DELETE",
  };
  return fetch(`${apiUrl}/delete-classwork/${id}`, requestOptions).then(
    handleResponse
  );
}

//events
function get_teacher_events() {
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

  return fetch(`${apiUrl}/teacher/get_events`, requestOptions).then(
    handleResponse
  );
}
function post_teacher_events(events) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(events),
  };

  return fetch(`${apiUrl}/teacher/post_events`, requestOptions).then(
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
