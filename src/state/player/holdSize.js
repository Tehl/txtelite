import { NEW_GAME } from "../../logic/events";

const PLAYER_SET_HOLD_SIZE = "PLAYER_SET_HOLD_SIZE";

const defaultValue = 0;

function holdSizeReducer(state = defaultValue, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.startingHoldSize;

    case PLAYER_SET_HOLD_SIZE:
      return action.value;

    default:
      return state;
  }
}

function getHoldSize(state) {
  return state;
}

export { PLAYER_SET_HOLD_SIZE };

export { holdSizeReducer };

export const selectors = { getHoldSize };