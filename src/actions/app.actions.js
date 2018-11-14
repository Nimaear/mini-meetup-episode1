//@flow
const ActionTypes = {
  CLICK: 'CLICK',
  CHANGE: 'CHANGE',
};

export const click = () => ({
  type: ActionTypes.CLICK,
});

export const change = (to: boolean) => ({
  type: ActionTypes.CHANGE,
  to,
});

export default ActionTypes;
