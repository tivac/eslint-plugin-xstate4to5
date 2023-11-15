const _test = require("./_test.js");
const rule = require("../transforms/guard-not-cond.js");

_test("guard-not-cond", rule, {
    valid : [`
        const machine = createMachine({
            on: {
                someEvent: {
                    guard: 'someGuard',
                    target: 'someState',
                },
            },
        });
    `],

    invalid : [{
        code : `
            const machine = createMachine({
                on: {
                    someEvent: {
                        cond: 'someGuard',
                        target: 'someState',
                    },
                },
            });
        `,
        output : `
            const machine = createMachine({
                on: {
                    someEvent: {
                        guard: 'someGuard',
                        target: 'someState',
                    },
                },
            });
        `,
        errors : [{ messageId : "wrong" }],
    }],
});