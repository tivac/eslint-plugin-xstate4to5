const tester =  require("../../tests/tester.js");
const rule = require("./implementation-arguments.js");

tester("implementation-arguments", rule, {
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