import { registerEvents as commandEvents } from "/logic/commands/eventRegistration";
import { registerEvents as logicEvents } from "/logic/events/eventRegistration";
import { registerEvents as appEvents } from "./events/eventRegistration";

function registerEvents(store, eventBus, parser) {
  function serviceProvider(eventHandler) {
    return event => eventHandler(store.getState(), eventBus, event);
  }

  commandEvents(eventBus, serviceProvider);
  logicEvents(eventBus, serviceProvider);
  appEvents(eventBus, serviceProvider, parser);
}

export default registerEvents;
