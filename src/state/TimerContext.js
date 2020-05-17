import createDataContext from './createDataContext';

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMER':
      return {
        ...state,
        timer: action.timerType,
      };
    default: 
      return state;
  }
};

const setTimer = (dispatch) => (timerType) => dispatch({ type: 'SET_TIMER', timerType });

export const { Provider, Context } = createDataContext(
  timerReducer,
  {
    setTimer,
  },
  {
    timer: 'STOP_WATCH',
  },
);