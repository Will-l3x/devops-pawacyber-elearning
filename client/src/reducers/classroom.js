import ClassroomConstants from "../constants/classroom";
const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ClassroomConstants.GET_ALL_CLASSWORK:
      state.classwork = payload;
      return state;
    case ClassroomConstants.GET_ALL_TEST_FOLDERS:
      state.test_folders = payload;
      return state;
    case ClassroomConstants.GET_ALL_ASSIGNMENT_FOLDERS:
      state.assignment_folders = payload;
      return state;
    case ClassroomConstants.GET_ALL_TEST_FILES:
      state.test_files = payload;
      return state;
    case ClassroomConstants.GET_ALL_ASSIGNMENT_FILES:
      state.assignment_files = payload;
      return state;
    case ClassroomConstants.ADD_CLASSROOM_MATERIAL:
      state.new_classroom_material = payload;
      return state;
    case ClassroomConstants.DELETE_CLASSWORK:
      state.deleted_classwork = payload;
      return state;
    case ClassroomConstants.ADD_TEACHER:
      state.new_teacher = payload;
      return state;
    case ClassroomConstants.ADD_STUDENT:
      state.new_student = payload;
      return state;
    case ClassroomConstants.UPDATE_STUDENT_MARKS:
      state.student_marks = payload;
      return state;
    case ClassroomConstants.UPLOAD_MARKED_CLASSWORK:
      state.uploaded_classwork = payload;
      return state;
    default:
      return state;
  }
};
