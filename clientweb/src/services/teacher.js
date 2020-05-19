import axios from 'axios';

const apiUrl = "http://localhost:3000";

export const TeacherService = {
  get_all_courses,
  get_teacher_pending_classwork,
  get_teacher_unmarked_classwork
};
 
// classroom
async function get_all_courses(teacher_id) {
   try {
    let res = await axios({
      url: `${apiUrl}/patients`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res)
    return  [
        {
          courseId: 1,
          courseName: "Mathematics",
          numberOfTopics: 5,
          courseCode: 1234,
        },
        {
          courseId: 2,
          courseName: "Mathematics",
          numberOfTopics: 7,
          courseCode: 123,
        },
        {
          courseId: 3,
          courseName: "Advanced Mathematics",
          numberOfTopics: 9,
          courseCode: 1456,
        },
      ];
    //return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function get_teacher_pending_classwork(teacher_id, classroom_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/get-all-pending/${teacher_id}/${classroom_id}`,
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
async function get_teacher_unmarked_classwork(teacher_id, classroom_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/get-all-unmarked/${teacher_id}/${classroom_id}`,
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
