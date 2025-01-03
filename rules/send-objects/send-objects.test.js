const tester = require("../../tests/tester.js");
const rule = require("./send-objects.js");

tester("send-objects", rule, {
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