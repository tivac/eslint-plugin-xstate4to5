const _test = require("./_test.js");
const rule = require("../transforms/eventless-use-always.js");

_test("eventless-use-always", rule, {
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