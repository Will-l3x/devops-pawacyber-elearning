import { StreamService } from "../services/stream";
import StreamConstants from "../constants/stream";
import AlertActions from "./alert";

const pageArraySplit = (array, pagingOptions) => {
  const currentPageNumber = pagingOptions.currentPageNumber;
  const perPage = pagingOptions.perPage;
  const startingIndex = (currentPageNumber - 1) * perPage;
  const endingIndex = startingIndex + perPage;
  return array.slice(startingIndex, endingIndex);
};

export const get_meetings = (currentPageNumber) => (dispatch) => {
  StreamService.get_meetings()
    .then((response) => {
      const meetingz =
        response === undefined ? [] : response.data.data.meetings;
      meetingz.sort((a, b) => new Date(b.date) - new Date(a.date));

      let pages = [];
      let perPage = 6;
      const totalPageCount = Math.ceil(meetingz.length / perPage);

      for (var i = 1; i <= totalPageCount; i++) {
        pages.push(i);
      }

      const meetings = pageArraySplit(meetingz, {
        currentPageNumber,
        perPage,
      });

      dispatch(AlertActions.success("Success"));
      dispatch({
        type: StreamConstants.GET_ALL_MEETINGS,
        payload: {
          pages,
          meetings,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: StreamConstants.GET_MEETING,
        payload: [],
      });
      dispatch(AlertActions.error(error));
    });
};
export const get_meeting = (id) => (dispatch) => {
  StreamService.get_meeting(id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: StreamConstants.GET_MEETING,
        payload: response.data.data.meeting[0],
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: StreamConstants.GET_MEETING,
        payload: {},
      });
      dispatch(AlertActions.error(error));
    });
};
export const get_meetings_by_classid = (id) => (dispatch) => {
  StreamService.get_meetings_by_classid(id)
    .then((response) => {
      const meetings = response.data.data.meetings;
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: StreamConstants.GET_ALL_MEETINGS_BY_CLASSID,
        payload: meetings.sort((a, b) => new Date(b.date) - new Date(a.date)),
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: StreamConstants.GET_ALL_MEETINGS_BY_CLASSID,
        payload: {},
      });
      dispatch(AlertActions.error(error));
    });
};
export const get_meetings_by_creatorid = (id) => (dispatch) => {
  StreamService.get_meetings_by_creatorid(id)
    .then((response) => {
      const meetings = response.data.data.meetings;
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: StreamConstants.GET_ALL_MEETINGS_BY_CREATORID,
        payload: meetings.sort((a, b) => new Date(b.date) - new Date(a.date)),
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: StreamConstants.GET_ALL_MEETINGS_BY_CREATORID,
        payload: {},
      });
      dispatch(AlertActions.error(error));
    });
};
export const create_meeting = (data) => (dispatch) => {
  StreamService.create_meeting(data)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: StreamConstants.CREATE_MEETING,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: StreamConstants.CREATE_MEETING,
        payload: {},
      });
      dispatch(AlertActions.error(error));
    });
};
export const start_meeting = (id, data) => (dispatch) => {
  StreamService.start_meeting(id, data)
    .then((response) => {
      response.meetingId = id;
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: StreamConstants.START_MEETING,
        payload: response,
      });
    })
    .catch((error) => {
      dispatch({
        type: StreamConstants.START_MEETING,
        payload: {},
      });
      dispatch(AlertActions.error(error));
    });
};
export const stop_meeting = (id) => (dispatch) => {
  StreamService.stop_meeting(id)
    .then((response) => {
      dispatch(AlertActions.success("Success"));
      dispatch({
        type: StreamConstants.STOP_MEETING,
        payload: response,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: StreamConstants.STOP_MEETING,
        payload: {},
      });
      dispatch(AlertActions.error(error));
    });
};
const StreamActions = {
  create_meeting,
  start_meeting,
  stop_meeting,
  get_meeting,
  get_meetings,
  get_meetings_by_creatorid,
  get_meetings_by_classid,
};
export default StreamActions;
