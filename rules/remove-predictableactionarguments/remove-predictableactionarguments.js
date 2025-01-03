const { inMachine } = require("../../util/in-machine.js");

// https://stately.ai/docs/migration#actions-ordered-by-default-predictableactionarguments-no-longer-needed
module.exports = {
    meta : {
        fixable : true,
        schema : [],

        messages : {
            wrong : `predictableActionArguments is no longer necessary`,
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
