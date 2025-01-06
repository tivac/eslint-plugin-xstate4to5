import tester from "../../tests/tester.js";
import rule from "./actions-ordered-by-default-predictableactionarguments-no-longer-needed.js";

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