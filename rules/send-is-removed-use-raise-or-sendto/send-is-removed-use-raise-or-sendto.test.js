import tester from "../../tests/tester.js";
import rule from "./send-is-removed-use-raise-or-sendto.js";

tester("send-is-removed-use-raise-or-sendto", rule, {
    valid : [`
        const machine = createMachine({
            states: {
                someState: {
                    entry: raise(),
                    exit : sendTo(),
                },
            },
        });
    `],

    invalid : [{
        code : `
            const machine = createMachine({
                states: {
                    someState: {
                        entry : send(),
                    },
                },
            });
        `,
        errors : [
            { messageId : "wrong", line : 5 },
        ],
    }],
});