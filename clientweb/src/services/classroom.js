import axios from 'axios';

const apiUrl = "http://loaclhost:3000/api";

export const ClassroomService = {
  get_all_classwork,
  post_new_classroom_material,
  delete_classwork,
  post_teacher_to_classroom,
  post_student_to_classroom,
  update_student_marks,
  upload_marked_classwork,
  get_all_test_folders,
  get_all_assignment_folders,
  get_all_test_files,
  get_all_assignment_files,
};

// classroom functions
async function get_all_classwork() {
   try {
    let res = await axios({
      url: `${apiUrl}/classroom/get-all-classwork`,
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
async function get_all_test_folders(classroom_id) {
   try {
    let res = await axios({
      url: `${apiUrl}/classroom/get-all-test-folder/${classroom_id}`,
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
async function get_all_assignment_folders(classroom_id) {
   try {
    let res = await axios({
      url: `${apiUrl}/classroom/get-all-assignment-folders/${classroom_id}`,
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
async function get_all_test_files(classroom_id,test_id) {
    /** details about location of student's file and the test it was uploaded for */
   try {
    let res = await axios({
      url: `${apiUrl}/classroom/get-all-test-files/${classroom_id}/${test_id}`,
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
async function get_all_assignment_files(classroom_id,assignment_id) {
   try {
    let res = await axios({
      url: `${apiUrl}/classroom/get-all-assignment-files/${classroom_id}/${assignment_id}`,
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
async function post_new_classroom_material(classroom_id, data) {
    /**
     * test, assignment etc
     */
  try {
    let res = await axios({
      url: `${apiUrl}/classroom/add-classroom-naterial/${classroom_id}`,
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
async function delete_classwork(classroom_id, material_id) {a
  try {
    let res = await axios({
      url: `${apiUrl}/classroom/delete-classwork/${classroom_id}/${material_id}`,
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
async function post_teacher_to_classroom(classroom_id, teacher_id) {
    /** add teacher-id to classroom */
  try {
    let res = await axios({
      url: `${apiUrl}/classroom/add-teacher/${classroom_id}/${teacher_id}`,
      method: "post",
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
async function post_student_to_classroom(classroom_id, student_id) {
    /** add student-id to classroom */
  try {
    let res = await axios({
      url: `${apiUrl}/classroom/add-student/${classroom_id}/${student_id}`,
      method: "post",
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
async function update_student_marks(classroom_id, student_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/classroom/update-student-marks/${classroom_id}/${student_id}`,
      method: "post",
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
async function upload_marked_classwork(classroom_id, classwork_id, data) {
  try {
    let res = await axios({
      url: `${apiUrl}/classroom/upload-marked-classwork/${classroom_id}/${classwork_id}`,
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

