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
      return {
        ...state,
        fileToUpload: payload,
      };
    case UploadContants.SET_UPLOAD_PROGRESS:
      return {
        ...state,
        fileToUpload: payload,
      };

    case UploadContants.SUCCESS_UPLOAD_FILE:
      let fileToUpload = Object.assign(state.fileToUpload, {
        status: 1,
      });

      return {
        ...state,
        fileToUpload,
      };

    case UploadContants.FAILURE_UPLOAD_FILE:
      fileToUpload = {
        progress: 0,
        status: 0,
      };

      return {
        ...state,
        fileToUpload,
      };
    case UploadContants.UPLOAD_FILE_CLEAR:
      return {
        ...state,
        fileToUpload: initialState.fileToUpload,
      };

    default:
      return state;
  }
};
