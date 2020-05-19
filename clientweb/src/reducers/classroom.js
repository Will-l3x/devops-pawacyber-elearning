import { ClassroomConstants } from "../constants/classroom";
const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ClassroomConstants.GET_ALL_CLASSWORK:
      return { ...state, classwork: payload };
    case ClassroomConstants.GET_ALL_TEST_FOLDERS:
      return { ...state, test_folders: payload };
    case ClassroomConstants.GET_ALL_ASSIGNMENT_FOLDERS:
      return { ...state, assignment_folders: payload };
    case ClassroomConstants.GET_ALL_TEST_FILES:
      return { ...state, test_files: payload };
    case ClassroomConstants.GET_ALL_ASSIGNMENT_FILES:
      return { ...state, assignment_files: payload };
    case ClassroomConstants.ADD_CLASSROOM_MATERIAL:
      return { ...state, new_classroom_material: payload };
    case ClassroomConstants.DELETE_CLASSWORK:
      return { ...state, deleted_classwork: payload };
    case ClassroomConstants.ADD_TEACHER:
      return { ...state, new_teacher: payload };
    case ClassroomConstants.ADD_STUDENT:
      return { ...state, new_student: payload };
    case ClassroomConstants.UPDATE_STUDENT_MARKS:
      return { ...state, student_marks: payload };
    case ClassroomConstants.UPLOAD_MARKED_CLASSWORK:
      return { ...state, uploaded_classwork: payload };
    default:
      return state;
  }
};
