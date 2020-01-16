import { getCurrentSystem, getGalaxyInfo } from "../../state/selectors";
import { findNearestByName } from "../world/navigation";
import { getFullSystemInfo } from "../world/systemInfo";
import { DISPLAY_FEEDBACK_INFO } from "../events/events";

const COMMAND_INFO = "COMMAND_INFO";

function onInfoCommand(state, eventBus, event) {
  const galaxy = getGalaxyInfo(state);
  const currentSystem = galaxy[getCurrentSystem(state)];

  let targetSystem;
  if (event.systemName) {
    targetSystem = findNearestByName(galaxy, currentSystem, event.systemName);
  }

  if (!targetSystem) {
    targetSystem = currentSystem;
  }

  const systemInfoText = getFullSystemInfo(targetSystem);

  eventBus.send(DISPLAY_FEEDBACK_INFO, { message: systemInfoText });
}

export const commandParser = {
  name: "info",
  createCommand: args => (state, eventBus) => {
    eventBus.send(COMMAND_INFO, { systemName: args });
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_INFO, serviceProvider(onInfoCommand));
};
