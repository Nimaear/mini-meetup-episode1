//*@flow*/
import { produce } from 'immer';

type ActionT = {
  type: string,
};
type StateT = {};
type ReducerT = (state: StateT, action: ActionT) => StateT;
type ImmerReducerT = (state: StateT, action: ActionT) => void;
type ImmerHandlersT = {
  [string]: ImmerReducerT,
  default?: ImmerReducerT,
};

const createReducer = (initialState: StateT, handlers: ImmerHandlersT): ReducerT => {
  return (state: StateT = initialState, action: ActionT): StateT => {
    return produce(state, (draft: {}) => {
      if (handlers[action.type]) {
        handlers[action.type](draft, action);
      }
      if (handlers.default) {
        handlers.default(draft, action);
      }
      return draft;
    });
  };
};

export default createReducer;
