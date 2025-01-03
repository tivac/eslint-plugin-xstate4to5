const tester =  require("../../tests/tester.js");
const rule = require("./remove-predictableactionarguments.js");

tester("remove-predictableactionarguments.test", rule, {
    valid : [`
        const machine = createMachine({});
    `],

    invalid : [{
        code : `
            const machine = createMachine({
                predictableActionArguments : true,
                states: {
                    // ...
                },
            });
        `,
        output : `
            const machine = createMachine({
                
                states: {
                    // ...
                },
            });
        `,
        errors : [{ messageId : "wrong" }],
    }],
});