export const commandParser = {
  name: "rand",
  createCommand: args => (state, eventBus) => {
    // no-op; native rand() is not supported
    return true;
  }
};
