//@flow
const ActionTypes = {
  CLICK: 'CLICK',
  CHANGE: 'CHANGE',
  API_RESPONSE: 'API_RESPONSE',
};

export const click = () => ({
  type: ActionTypes.CLICK,
});

export const change = (to: boolean) => ({
  type: ActionTypes.CHANGE,
  to,
});

export const response = (data) => ({
  type: ActionTypes.API_RESPONSE,
  data,
});

export default ActionTypes;
