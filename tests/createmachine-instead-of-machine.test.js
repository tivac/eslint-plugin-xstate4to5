const _test = require("./_test.js");
const rule = require("../transforms/createmachine-instead-of-machine.js");

_test("createmachine-instead-of-machine", rule, {
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
        errors : [{ messageId : "wrong" }, { messageId : "wrong" }],
    }],
});