import tester from "../../tests/tester.js";
import rule from "./implementation-functions-receive-a-single-argument.js";

tester("implementation-functions-receive-a-single-argument", rule, {
    valid : [
        `
            const machine = createMachine({
                states : {
                    one : {
                        entry : ({ context, event }) => {},
                        exit : ({ context }) => {},
                    }
                }
            });
        `,
         `
            const machine = createMachine({
                invoke : [
                    foo(bar, ($bar, dispatch) =>
                        dispatch({ type : $bar ? "BAR" : "NO_BAR" })
                    ),
                ],
            });
        `,
        `
            const machine = createMachine({
                states : {
                    one : {
                        entry : ({ context : { foo } }) => {},
                    },
                },
            });
        `,
        `
            const machine = createMachine({
                states : {
                    one : {
                        entry : [
                            ({ context : { foo } }) => {},
                        ],
                    },
                },
            });
        `,
        `
            const machine = createMachine({
                states : {
                    one : {
                        entry : [
                            assign(() => {
                                return { foo : true }
                            }),
                        ],
                    },
                },
            });
        `,
    ],

    invalid : [
        {
            code : `
                const machine = createMachine({
                    states : {
                        one : {
                            entry : (context, event) => {},
                            exit : (context) => {},

                            on : {
                                FOO : {
                                    target : "foo",
                                    actions : (context) => {},
                                },

                                BAR : {
                                    target : "bar",
                                    actions : [
                                        (context) => {},
                                        (context, event) => {},
                                    ],
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
                            entry : ({ context, event }) => {},
                            exit : ({ context }) => {},

                            on : {
                                FOO : {
                                    target : "foo",
                                    actions : ({ context }) => {},
                                },

                                BAR : {
                                    target : "bar",
                                    actions : [
                                        ({ context }) => {},
                                        ({ context, event }) => {},
                                    ],
                                },
                            },
                        },
                    },
                });
            `,
            errors : [
                { messageId : "wrong", line : 5 },
                { messageId : "wrong", line : 6 },
                { messageId : "wrong", line : 11 },
                { messageId : "wrong", line : 17 },
                { messageId : "wrong", line : 18 },
            ],
        },
        {
            code : `
                const machine = createMachine({
                    states : {
                        one : {
                            entry : ({ one, two }) => {},
                            exit : (context) => {},

                            on : {
                                FOO : {
                                    target : "foo",
                                    guard : ({ one, two }) => {},
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
                            exit : ({ context }) => {},

                            on : {
                                FOO : {
                                    target : "foo",
                                    guard : ({ context : { one, two } }) => {},
                                    actions : ({ context : { one, two } }) => {},
                                },
                            },
                        },
                    },
                });
            `,
            errors : [
                { messageId : "wrong", line : 5 },
                { messageId : "wrong", line : 6 },
                { messageId : "wrong", line : 11, },
                { messageId : "wrong", line : 12, },
            ],
        },
        {
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
            errors : [
                { messageId : "wrong", line : 5 },
                { messageId : "wrong", line : 10 }
            ],
        },
    ],
});