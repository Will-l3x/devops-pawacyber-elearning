import UploadContants from "../constants/upload";

const initialState = {
  fileProgress: {
    fileToUpload: {
      progress: 0,
      status: 0,
    },
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UploadContants.SET_UPLOAD_FILE:
      return {
        ...state,
        fileProgress: {
          fileToUpload: payload,
        },
      };
    case UploadContants.SET_UPLOAD_PROGRESS:
      return {
        ...state,
        fileProgress: {
          fileToUpload: payload,
        },
      };

    case UploadContants.SUCCESS_UPLOAD_FILE:
      let fileToUpload = Object.assign(state.fileProgress.fileToUpload, {
        status: 1,
      });

      return {
        ...state,
        fileProgress: {
          fileToUpload,
        },
      };

    case UploadContants.FAILURE_UPLOAD_FILE:
      fileToUpload = Object.assign(state.fileProgress.fileToUpload, {
        progress: 0,
        status: 0,
      });

      return {
        ...state,
        fileProgress: {
          fileToUpload,
        },
      };
    case UploadContants.UPLOAD_FILE_CLEAR:
      return {
        ...state,
        fileProgress: initialState.fileProgress,
      };

    default:
      return state;
  }
};
