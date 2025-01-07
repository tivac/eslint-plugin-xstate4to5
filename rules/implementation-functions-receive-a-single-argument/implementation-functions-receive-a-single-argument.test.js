import tester from "../../tests/tester.js";
import rule from "./implementation-functions-receive-a-single-argument.js";

tester("implementation-functions-receive-a-single-argument", rule, {
    valid : [`
        const machine = createMachine({
            states : {
                one : {
                    entry : ({ context, event }) => {},
                }
            }
        });
    `, `
        const machine = createMachine({
            invoke : [
                foo(bar, ($bar, dispatch) =>
                    dispatch({ type : $bar ? "BAR" : "NO_BAR" })
                ),
            ],
        });
    `],

    invalid : [{
        code : `
            const machine = createMachine({
                states : {
                    one : {
                        entry : (context, event) => {},
                        exit : (context) => {},
                    },
                },
            });
        `,
        output : `
            const machine = createMachine({
                states : {
                    one : {
                        entry : ({ context : context, event : event }) => {},
                        exit : ({ context : context }) => {},
                    },
                },
            });
        `,
        errors : [{ messageId : "wrong" }, { messageId : "wrong" }, { messageId : "wrong" }, { messageId : "wrong" }],
    }, {
        code : `
            const machine = createMachine({
                states : {
                    one : {
                        entry : ({ one, two }) => {},

                        on : {
                            FOO : {
                                target : () => {},
                                actions : ({ one, two }) => {},
                            },
                        },
                    },
                },
            });
        `,
        output : `
            const machine = createMachine({
                states : {
                    one : {
                        entry : ({ context : { one, two } }) => {},

                        on : {
                            FOO : {
                                target : () => {},
                                actions : ({ context : { one, two } }) => {},
                            },
                        },
                    },
                },
            });
        `,
        errors : [{ messageId : "wrong" }, { messageId : "wrong" }],
    }, {
        code : `
            const machine = createMachine({
                states : {
                    one : {
                        entry : ({ one, two }, { three, four }) => {},

                        on : {
                            FOO : {
                                target : () => {},
                                actions : ({ one, two }, { three, four }) => {},
                            },
                        },
                    },
                },
            });
        `,
        output : `
            const machine = createMachine({
                states : {
                    one : {
                        entry : ({ context : { one, two }, event : { three, four } }) => {},

                        on : {
                            FOO : {
                                target : () => {},
                                actions : ({ context : { one, two }, event : { three, four } }) => {},
                            },
                        },
                    },
                },
            });
        `,
        errors : [{ messageId : "wrong" }, { messageId : "wrong" }],
    } ],
});