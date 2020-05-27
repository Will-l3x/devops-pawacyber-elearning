import axios from "axios";

const apiUrl = "http://localhost:5000";

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
    return res;
  } catch (error) {
    dispatch(failureUploadFile(file.id));
  }
}
