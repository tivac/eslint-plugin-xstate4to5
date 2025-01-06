import tester from "../../tests/tester.js";
import rule from "./output-in-final-states.js";

tester("use-output-in-final-states-instead-of-data", rule, {
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