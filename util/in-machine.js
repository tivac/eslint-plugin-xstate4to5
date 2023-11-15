const inMachine = (query) => `CallExpression[callee.name="createMachine"] ${query}`;

exports.inMachine = inMachine;
