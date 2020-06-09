import axios from "axios";
const apiUrl = "http://cybers.azurewebsites.net/api";
//const apiUrl = "http://localhost:3001/api";

export const ClassroomService = {
  post_new_assignment,
  get_materials,
  post_new_material,
  get_assiginments,
  get_submissions,
  get_materialId,
  get_assiginmentId,
  mark_assignment,
  comment_assignment,
  new_reminder,
  new_msg,
  get_students,
  post_file,
};

// classroom functions

async function post_new_assignment(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/new_assignment`,
      method: "post",
      data,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}

async function post_file(data) {
  try {
    let res = await axios({
      url: `${apiUrl}/upload/new`,
      method: "post",
      data,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}

async function get_materials(id) {
  //by class id
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/get_materials/${id}`,
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}

async function  post_new_material(data){
   try {
    let res = await axios({
      url: `${apiUrl}/teacher/new_material`,
      method: "post",
      data,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}

async function  get_assiginments(id){
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/get_assignments/${id}`,  
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}
async function  get_submissions(id){
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/get_submissions/${id}`,  
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}
async function  get_materialId(id){
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/get_material/${id}`,  
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}
async function  get_assiginmentId(id){
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/get_assignments/${id}`,  
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}
async function  mark_assignment(){
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/mark_assignment`,  
      method: "put",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}
async function  comment_assignment(){
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/comment_assignment`,  
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}
async function  new_reminder(){
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/new_reminder`,  
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}
async function  new_msg(id, data){
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/new_msg`,  
      method: "post",
      data,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}
async function  get_students(id){
  try {
    let res = await axios({
      url: `${apiUrl}/teacher/get_students/${id}`,  
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}