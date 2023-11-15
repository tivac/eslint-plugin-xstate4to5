const _test = require("./_test.js");
const rule = require("../transforms/remove-predictableactionarguments.js");

_test("remove-predictableactionarguments.test", rule, {
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