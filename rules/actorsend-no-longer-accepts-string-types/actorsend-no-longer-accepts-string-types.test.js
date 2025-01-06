const tester = require("../../tests/tester.js");
const rule = require("./actorsend-no-longer-accepts-string-types.js");

tester("actorsend-no-longer-accepts-string-types", rule, {
    valid : [`
        actor.send({ type : 'someEvent' });
    `],

    invalid : [{
        code : `
            actor.send('someEvent');
        `,
        output : `
            actor.send({ type : "someEvent" });
        `,
        errors : [{ messageId : "wrong" }],
    }],
});