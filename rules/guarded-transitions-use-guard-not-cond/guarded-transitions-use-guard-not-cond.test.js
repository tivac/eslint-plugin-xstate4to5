import tester from "../../tests/tester.js";
import rule from "./guarded-transitions-use-guard-not-cond.js";

tester("guarded-transitions-use-guard-not-cond", rule, {
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