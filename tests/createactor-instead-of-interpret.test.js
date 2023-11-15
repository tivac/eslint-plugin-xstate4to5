const _test = require("./_test.js");
const rule = require("../transforms/createactor-instead-of-interpret.js");

_test("createactor-instead-of-interpret", rule, {
    valid : [`
        import { createMachine, createActor } from 'xstate';

        const machine = createMachine(/* ... */);

        const actor = createActor(machine);
    `],

    invalid : [{
        code : `
            import { createMachine, interpret } from 'xstate';

            const machine = createMachine(/* ... */);

            const actor = interpret(machine);
        `,
        output : `
            import { createMachine, createActor } from 'xstate';

            const machine = createMachine(/* ... */);

            const actor = createActor(machine);
        `,
        errors : [{ messageId : "wrong" }, { messageId : "wrong" }],
    }],
});