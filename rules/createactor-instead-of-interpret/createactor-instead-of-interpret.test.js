const tester =  require("../../tests/tester.js");
const rule = require("./createactor-instead-of-interpret.js");

tester("createactor-instead-of-interpret", rule, {
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