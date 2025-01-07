import { inMachine } from "../../util/in-machine.js";

// https://stately.ai/docs/migration#send-is-removed-use-raise-or-sendto
export default {
    meta : {
		type : "problem",
        fixable : "code",
        schema : [],

        messages : {
            wrong : `Use raise() or sendTo() instead of send()`,
        },
    },

    create(context) {
        return {
            [inMachine(`:expression[callee.name="send"]`)](node) {
                context.report({
                    node,
                    messageId : "wrong",
                })
            },
        };
    },
};
