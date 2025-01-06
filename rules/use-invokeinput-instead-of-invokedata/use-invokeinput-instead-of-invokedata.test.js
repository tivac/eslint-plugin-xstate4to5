import tester from "../../tests/tester.js";
import rule from "./use-invokeinput-instead-of-invokedata.js";

tester("use-invokeinput-instead-of-invokedata", rule, {
    valid : [`
        const machine = createMachine({
            // ...
            invoke: {
                src: 'someActor',
                input: {
                    value: 42,
                },
            },
        });
    `],

    invalid : [{
        code : `
            const machine = createMachine({
                // ...
                invoke: {
                    src: 'someActor',
                    data: {
                        value: 42,
                    },
                },
            });
        `,
        output : `
            const machine = createMachine({
                // ...
                invoke: {
                    src: 'someActor',
                    input: {
                        value: 42,
                    },
                },
            });
        `,
        errors : [{ messageId : "wrong" }],
    }],
});