import { inMachine } from "../../util/in-machine.js";

// https://stately.ai/docs/migration#actions-ordered-by-default-predictableactionarguments-no-longer-needed
export default {
    meta : {
        type : "problem",
        fixable : "code",
        schema : [],

        messages : {
            wrong : "Actions ordered by default, `predictableActionArguments` no longer needed",
        },
    },

    create(context) {
        return {
            [inMachine(`Property[key.name="predictableActionArguments"]`)](node) {
                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.removeRange([ node.range[0], node.range[1] + 1 ]),
                })
            },
        };
    },
};
