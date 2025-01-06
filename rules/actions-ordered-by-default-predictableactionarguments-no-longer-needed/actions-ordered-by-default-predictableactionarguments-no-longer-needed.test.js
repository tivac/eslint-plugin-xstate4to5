const tester =  require("../../tests/tester.js");
const rule = require("./actions-ordered-by-default-predictableactionarguments-no-longer-needed.js");

tester("actions-ordered-by-default-predictableactionarguments-no-longer-needed", rule, {
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