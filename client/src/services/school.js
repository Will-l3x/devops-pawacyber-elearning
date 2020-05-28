import axios from "axios";

import blog_1 from "../assets/images/blog_1.jpg";
import blog_2 from "../assets/images/blog_2.jpg";
import blog_4 from "../assets/images/blog_4.jpg";

// const apiUrl = "http://cybers.azurewebsites.net/api/schooladmin";
const apiUrl = "http://localhost:3001/api/schooladmin";

export const SchoolService = {
  get_subscribed_courses,
  subscribe_course,
  unsubscribe_course,
  post_new_teachers,
  get_all_teachers,
  get_all_students,
  post_new_course,
  get_courses
  
};
const pageArraySplit = (array, pagingOptions) => {
  const currentPageNumber = pagingOptions.currentPageNumber;
  const perPage = pagingOptions.perPage;
  const startingIndex = (currentPageNumber - 1) * perPage;
  const endingIndex = startingIndex + perPage;
  return array.slice(startingIndex, endingIndex);
};

// course functions
async function get_subscribed_courses(school_id, currentPageNumber, lim) {
  try {
    /**
     let res = await axios({
      url: `${apiUrl}/course/get-subscribed-courses/${school_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    */
    let res = {
      data: [
        { id: "1", title: "Course Name 1", subscribed: true, img: blog_1 },
        { id: "2", title: "Course Name 2", subscribed: true, img: blog_2 },
        { id: "4", title: "Course Name 4", subscribed: true, img: blog_4 },
      ],
    };
    if (lim === "ALL") {
      console.log(res);
      return res.data;
    }
    let pages = [];
    let perPage = 8;
    const totalPageCount = Math.ceil(res.data.length / perPage);

    for (var i = 1; i <= totalPageCount; i++) {
      pages.push(i);
    }
    const subscribed_courses = pageArraySplit(res.data, {
      currentPageNumber,
      perPage,
    });
    return { subscribed_courses, pages };
  } catch (err) {
    console.error(err);
  }
}
async function subscribe_course(school_id, course_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/course/subscribe-course/${school_id}/${course_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}
async function unsubscribe_course(school_id, course_id) {
  try {
    let res = await axios({
      url: `${apiUrl}/course/subscribe-course/${school_id}/${course_id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}





// Create Courses

async function post_new_course(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/add_class`,
      method: "post",
      data,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function get_courses(id) {
  try {
    let res = await axios({
      url: `${apiUrl}/get_classes/${id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data.classes;
  } catch (err) {
    console.error(err);
  }
}


// teacher functions
async function get_all_teachers(id) {
  try {
    let res = await axios({
      url: `${apiUrl}/teachers/${id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data.teachers;
  } catch (err) {
    console.error(err);
  }
}

async function post_new_teachers(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/add_teacher`,
      method: "post",
      data,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
}



// student functions
async function get_all_students(id) {
  try {
    let res = await axios({
      url: `${apiUrl}/students/${id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data.students;

  } catch (err) {
    console.error(err);
  }
}

export default SchoolService;
