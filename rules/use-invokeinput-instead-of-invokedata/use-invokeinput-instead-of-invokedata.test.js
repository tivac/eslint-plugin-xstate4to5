import tester from "../../tests/tester.js";
import rule from "./invoke-input-instead-of-invoke-data.js";

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