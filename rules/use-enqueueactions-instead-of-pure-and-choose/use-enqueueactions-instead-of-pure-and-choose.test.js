import tester from "../../tests/tester.js";
import rule from "./use-enqueueactions-instead-of-pure-and-choose.js";

tester("use-enqueueactions-instead-of-pure-and-choose", rule, {
    valid : [`
        const machine = createMachine({
            states: {
                someState: {
                    entry: [
                        enqueueActions(({ context, event, enqueue }) => {
                            enqueue('action1');
                            enqueue('action2');
                        }),
                    ],
                },
            },
        });
    `, `
        const machine = createMachine({
            states: {
                someState: {
                    entry: [
                        enqueueActions(({ enqueue, check }) => {
                            if (check('someGuard')) {
                                enqueue('action1');
                                enqueue('action2');
                            }
                        }),
                    ],
                },
            },
        });
    `],

    invalid : [{
        code : `
            const machine = createMachine({
                states: {
                    someState: {
                        entry: [
                            pure(() => {
                                return ['action1', 'action2'];
                            }),
                        ],
                    },
                },
            });
        `,
        output : `
            const machine = createMachine({
                states: {
                    someState: {
                        entry: [
                            // TODO: converted from pure(), double-check logic
enqueueActions(({ context, event, enqueue }) => {
                                return ['action1', 'action2'];
                            }),
                        ],
                    },
                },
            });
        `,
        errors : [{ messageId : "pure" }],
    }, {
        code : `
            const machine = createMachine({
                states: {
                    someState: {
                        entry: pure(() => {
                            return ['action1', 'action2'];
                        }),
                    },
                },
            });
        `,
        output : `
            const machine = createMachine({
                states: {
                    someState: {
                        entry: // TODO: converted from pure(), double-check logic
enqueueActions(({ context, event, enqueue }) => {
                            return ['action1', 'action2'];
                        }),
                    },
                },
            });
        `,
        errors : [{ messageId : "pure" }],
    }, {
        code : `
            const machine = createMachine({
                states: {
                    someState: {
                        entry: choose([
                            {
                                guard: 'someGuard',
                                actions: ['action1', 'action2'],
                            },
                        ]),
                    },
                },
            });
        `,
        errors : [{ messageId : "choose" }],
    }, {
        code : `
            const machine = createMachine({
                states: {
                    someState: {
                        entry: [
                            choose([
                                {
                                    guard: 'someGuard',
                                    actions: ['action1', 'action2'],
                                },
                            ]),
                        ],
                    },
                },
            });
        `,
        errors : [{ messageId : "choose" }],
    }],
});