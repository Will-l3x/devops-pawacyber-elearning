import axios from "axios";

import blog_1 from "../assets/images/blog_1.jpg";
import blog_2 from "../assets/images/blog_2.jpg";
import blog_3 from "../assets/images/blog_3.jpg";
import blog_4 from "../assets/images/blog_4.jpg";
import blog_5 from "../assets/images/blog_5.jpg";
import blog_6 from "../assets/images/blog_6.jpg";

const apiUrl = "http://localhost:3000/api";

export const SchoolService = {
  get_subscribed_courses,
  subscribe_course,
  unsubscribe_course,
  get_all_teachers,
  get_all_students,
};
const pageArraySplit = (array, pagingOptions) => {
  const currentPageNumber = pagingOptions.currentPageNumber;
  const perPage = pagingOptions.perPage;
  const startingIndex = (currentPageNumber - 1) * perPage;
  const endingIndex = startingIndex + perPage;
  return array.slice(startingIndex, endingIndex);
};
// course functions
async function get_subscribed_courses(school_id, currentPageNumber) {
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
        { id: "1", title: "Course Name 1", img: blog_1 },
        { id: "2", title: "Course Name 2", img: blog_2 },
        { id: "3", title: "Course Name 3", img: blog_3 },
        { id: "4", title: "Course Name 4", img: blog_4 },
        { id: "5", title: "Course Name 5", img: blog_5 },
        { id: "6", title: "Course Name 6", img: blog_6 },
      ],
    };
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

// teacher functions
async function get_all_teachers() {
  try {
    let res = await axios({
      url: `${apiUrl}/school/get-all-teachers`,
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
// student functions
async function get_all_students() {
  try {
    let res = await axios({
      url: `${apiUrl}/school/get-all-students`,
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

export default SchoolService;
