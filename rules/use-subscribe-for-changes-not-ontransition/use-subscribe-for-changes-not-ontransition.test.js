const tester =  require("../../tests/tester.js");
const rule = require("./use-subscribe-for-changes-not-ontransition.js");

tester("use-subscribe-for-changes-not-ontransition", rule, {
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