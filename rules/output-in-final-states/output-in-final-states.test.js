const tester =  require("../../tests/tester.js");
const rule = require("./output-in-final-states.js");

tester("output-in-final-states.test", rule, {
    valid : [`
        const machine = createMachine({
            states: {
                finished: {
                    type: 'final',
                    output: {
                        answer: 42,
                    },
                },
            },
        });
    `],

    invalid : [{
        code : `
            const machine = createMachine({
                states: {
                    finished: {
                        type: 'final',
                        data: {
                            answer: 42,
                        },
                    },
                },
            });
        `,
        output : `
            const machine = createMachine({
                states: {
                    finished: {
                        type: 'final',
                        output: {
                            answer: 42,
                        },
                    },
                },
            });
        `,
        errors : [{ messageId : "wrong" }],
    }],
});