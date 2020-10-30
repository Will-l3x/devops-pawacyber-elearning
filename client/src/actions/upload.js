import UploadContants from "../constants/upload";
import { UploadService } from "../services/upload";
import AlertActions from "./alert";

export const setUploadFile = (data) => (dispatch) =>
  dispatch({
    type: UploadContants.SET_UPLOAD_FILE,
    payload: data,
  });

export const setUploadProgress = (id, progress) => ({
    type: UploadContants.SET_UPLOAD_PROGRESS,
    payload: {
      id,
      progress,
    },
  });


export const successUploadFile = (id) => ({
    type: UploadContants.SUCCESS_UPLOAD_FILE,
    payload: id,
  });

export const failureUploadFile = (id) =>({
    type: UploadContants.FAILURE_UPLOAD_FILE,
    payload: id,
  });
export const fileClear = () => dispatch=> dispatch({
    type: UploadContants.UPLOAD_FILE_CLEAR,
  });

export const uploadFile = (file) => (dispatch) => {
  const formPayload = new FormData();
  formPayload.append("file", file.file);

  UploadService.upload(
    file,
    formPayload,
    dispatch,
    setUploadProgress,
    successUploadFile,
    failureUploadFile
  )
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      dispatch(AlertActions.error(error));
    });
};

const UploadActions = {
  setUploadFile,
  setUploadProgress,
  successUploadFile,
  failureUploadFile,
  uploadFile,
  fileClear
};
export default UploadActions;
