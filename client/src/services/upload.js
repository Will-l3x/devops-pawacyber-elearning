import axios from "axios";

const apiUrl = "http://cybers.azurewebsites.net/api";
// const apiUrl = "http://localhost:3001/api";

export const UploadService = {
  upload,
};

async function upload(
  file,
  data,
  dispatch,
  setUploadProgress,
  successUploadFile,
  failureUploadFile
) {
  try {
    let res = await axios({
      url: `${apiUrl}/file-upload`,
      method: "post",
      data,
      onUploadProgress: (progress) => {
        const { loaded, total } = progress;

        const percentageProgress = Math.floor((loaded / total) * 100);
        dispatch(setUploadProgress(file.id, percentageProgress));
      },
    });
    dispatch(successUploadFile(file.id));
    //res.data {
    //  --------after upload of file this is required ----------
    //          path : "path/to/file",
    //}
    return res;
  } catch (error) {
    dispatch(failureUploadFile(file.id));
  }
}
