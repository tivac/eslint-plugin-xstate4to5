const tester =  require("../../tests/tester.js");
const rule = require("./use-createmachine-not-machine.js");

tester("use-createmachine-not-machine", rule, {
    valid : [ 
        `
            import { createMachine } from 'xstate';

            const machine = createMachine({
                // ...
            });
        `,
    ],

    invalid : [{
        code : `
            import { Machine } from 'xstate';

            const machine = Machine({
                // ...
            });
        `,
        output : `
            import { createMachine } from 'xstate';

            const machine = createMachine({
                // ...
            });
        `,
        errors : [
            { messageId : "wrong" },
            { messageId : "wrong" }
        ],
    }],
});