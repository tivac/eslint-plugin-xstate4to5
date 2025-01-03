const tester =  require("../../tests/tester.js");
const rule = require("./subscribe-instead-of-ontransition.js");

tester("subscribe-instead-of-ontransition", rule, {
    valid : [`
        const actor = interpret(machine);
        actor.subscribe((state) => {
            // ...
        });
    `],

    invalid : [{
        code : `
        const actor = interpret(machine);
        actor.onTransition((state) => {
            // ...
        });
        `,
        output : `
        const actor = interpret(machine);
        actor.subscribe((state) => {
            // ...
        });
        `,
        errors : [{ messageId : "wrong" }],
    }],
});