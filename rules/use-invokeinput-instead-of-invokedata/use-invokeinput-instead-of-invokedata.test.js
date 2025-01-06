const tester =  require("../../tests/tester.js");
const rule = require("./invoke-input-instead-of-invoke-data.js");

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