const _test = require("./_test.js");
const rule = require("../transforms/send-objects.js");

_test("send-objects", rule, {
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