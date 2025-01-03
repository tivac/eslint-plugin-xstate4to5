const tester =  require("../../tests/tester.js");
const rule = require("./eventless-use-always.js");

tester("eventless-use-always", rule, {
    valid : [`
        const machine = createMachine({
            states: {
                someState: {
                    on: {
                        always: {
                            target: 'anotherState',
                        },
                    },
                },
            },
        });
    `],

    invalid : [{
        code : `
            const machine = createMachine({
                states: {
                    someState: {
                        on: {
                            '': {
                                target: 'anotherState',
                            },
                        },
                    },
                },
            });
        `,
        output : `
            const machine = createMachine({
                states: {
                    someState: {
                        on: {
                            always: {
                                target: 'anotherState',
                            },
                        },
                    },
                },
            });
        `,
        errors : [{ messageId : "wrong" }],
    }],
});