const inMachine = (query) => `CallExpression[callee.name="createMachine"] ${query}`;

export {
    inMachine,
};
