import UploadContants from "../constants/upload";

const initialState = {
  fileToUpload: {
    progress: 0,
    status: 0,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UploadContants.SET_UPLOAD_FILE:
      state.fileToUpload = payload;
      return state;
    case UploadContants.SET_UPLOAD_PROGRESS:
      state.fileToUpload = payload;
      return state;

    case UploadContants.SUCCESS_UPLOAD_FILE:
      let fileToUpload = Object.assign(state.fileToUpload, {
        status: 1,
      });
      state.fileToUpload = fileToUpload;
      return state;

    case UploadContants.FAILURE_UPLOAD_FILE:
      fileToUpload = {
        progress: 0,
        status: 0,
      };
      state.fileToUpload = fileToUpload;
      return state;

    case UploadContants.UPLOAD_FILE_CLEAR:
      state.fileToUpload = initialState.fileToUpload;
      return state;

    default:
      return state;
  }
};
