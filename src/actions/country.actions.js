//@flow
const ActionTypes = {
  API_REQUEST_DONE: 'country/request/done',
  API_REQUEST_START: 'country/request/start',
  API_REQUEST_FAIL: 'country/request/fail',
};

export const requestDone = (data) => ({
  type: ActionTypes.API_REQUEST_DONE,
  data,
});

export const startRequest = () => ({
  type: ActionTypes.API_REQUEST_START,
});

export const failRequest = () => ({
  type: ActionTypes.API_REQUEST_FAIL,
});

export default ActionTypes;
