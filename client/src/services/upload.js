import axios from "axios";
const qs = require("qs");





export const UploadService = {
  upload,
  post_material,
};

async function post_material(data) {
  const token = await JSON.parse(localStorage.getItem("token"));
var config = {
  baseURL: "https://pawacyberschool.net/api/teacher",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "https://pawacyberschool.net",
    "Access-Control-Allow-Credentials": true,
  },
};
  try {
    let res = await axios.post(`/new_material`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function upload(data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "https://pawacyberschool.net/api/teacher",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.post(
      `https://pawacyberschool.net/api/upload/new`,
     data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
    return [];
  }
}


