const tester =  require("../../tests/tester.js");
const rule = require("./use-createactor-not-interpret.js");

tester("use-createactor-not-interpret", rule, {
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