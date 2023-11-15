const _test = require("./_test.js");
const rule = require("../transforms/subscribe-instead-of-ontransition.js");

_test("subscribe-instead-of-ontransition", rule, {
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