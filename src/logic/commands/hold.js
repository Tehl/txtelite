import { DISPLAY_FEEDBACK_FAILURE, SET_HOLD_SIZE } from "/logic/events/events";
import { getHoldSpaceUsed } from "/state/selectors";

const COMMAND_HOLD = "COMMAND_HOLD";

function onHoldCommand(state, eventBus, event) {
  eventBus.send(SET_HOLD_SIZE, { value: event.holdSize });
}

export const commandParser = {
  name: "hold",
  createCommand: args => (state, eventBus) => {
    const newHoldSize = parseInt(args, 10);
    if (isNaN(newHoldSize)) {
      eventBus.send(DISPLAY_FEEDBACK_FAILURE, {
        message: "Number not understood"
      });
      return false;
    }

    const spaceUsed = getHoldSpaceUsed(state);
    if (spaceUsed > newHoldSize) {
      eventBus.send(DISPLAY_FEEDBACK_FAILURE, {
        message: "Hold too full"
      });
      return false;
    }

    eventBus.send(COMMAND_HOLD, { holdSize: newHoldSize });
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_HOLD, serviceProvider(onHoldCommand));
};
