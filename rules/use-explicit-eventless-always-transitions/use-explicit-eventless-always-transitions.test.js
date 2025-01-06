import tester from "../../tests/tester.js";
import rule from "./use-explicit-eventless-always-transitions.js";

tester("use-explicit-eventless-always-transitions", rule, {
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