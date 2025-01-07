import tester from "../../tests/tester.js";
import rule from "./use-actor-logic-creators-for-invokesrc-instead-of-functions.js";

tester("use-actor-logic-creators-for-invokesrc-instead-of-functions", rule, {
    valid : [`
        const machine = createMachine({
            invoke : {
                id : "foo",
                src : () => {},
            },
        });
    `],

    invalid : [
        {
            code : `
                const machine = createMachine({
                    invoke : {
                        id : "foo",
                        src : async () => {},
                    },
                });
            `,
            output : `
                const machine = createMachine({
                    invoke : {
                        id : "foo",
                        src : fromPromise(async () => {}),
                    },
                });
            `,
            errors : [
                { messageId : "promise", line : 5 },
            ],
        },
        {
            code : `
                const machine = createMachine({
                    invoke : {
                        id : "foo",
                        src : () => () => {},
                    },
                });
            `,
            errors : [
                { messageId : "callback", line : 5 },
            ],
        }
    ],
});