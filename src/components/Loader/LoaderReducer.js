import { ACTION_TYPES } from './LoaderActions';

const INIT_STATE = {
  isLoading: false,
  queue: []
};

const loaderReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE: {
      const q = [...state.queue];
      const { val, id } = action;
      let v = val;

      if (id) {
        const i = q.findIndex((j) => j === id);
        if (i >= 0) {
          if (!val) {
            q.splice(i, 1);
          }
        } else {
          if (val) {
            q.push(id);
          }
        }
      }

      if (!val && q.length <= 0) {
        v = false;
      } else {
        v = true;
      }

      return {
        ...state,
        isLoading: v,
        queue: q
      };
    }

    default:
      return state;
  }
};

export default loaderReducer;
