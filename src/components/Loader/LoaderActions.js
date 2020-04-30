export const ACTION_TYPES = {
  TOGGLE: 'TOGGLE'
};

const toggle = (val, id) => async (dispatch) => {
  dispatch({
    type: ACTION_TYPES.TOGGLE,
    val,
    id
  });
};

export default {
  toggle
};
