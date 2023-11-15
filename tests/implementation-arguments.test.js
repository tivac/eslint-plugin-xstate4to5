const _test = require("./_test.js");
const rule = require("../transforms/implementation-arguments.js");

_test("implementation-arguments", rule, {
    valid : [`
        const machine = createMachine({
            states : {
                one : {
                    entry : ({ context, event }) => {},
                }
            }
        });
    `],

    invalid : [{
        code : `
            const machine = createMachine({
                states : {
                    one : {
                        entry : (context, event) => {},
                        exit : (context) => {},
                    }
                }
            });
        `,
        output : `
            const machine = createMachine({
                states : {
                    one : {
                        entry : ({ context : context, event : event }) => {},
                        exit : ({ context : context }) => {},
                    }
                }
            });
        `,
        errors : [{ messageId : "wrong" }, { messageId : "wrong" }],
    }, {
        code : `
            const machine = createMachine({
                states : {
                    one : {
                        entry : ({ one, two }, { three, four }) => {},
                    }
                }
            });
        `,
        output : `
            const machine = createMachine({
                states : {
                    one : {
                        entry : ({ context : { one, two }, event : { three, four } }) => {},
                    }
                }
            });
        `,
        errors : [{ messageId : "wrong" }],
    }],
});