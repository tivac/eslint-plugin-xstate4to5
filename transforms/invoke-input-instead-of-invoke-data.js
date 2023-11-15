const { inMachine } = require("../util/in-machine.js");

// https://stately.ai/docs/migration#use-invokeinput-instead-of-invokedata
module.exports = {
    meta : {
        fixable : true,
        schema : [],

        messages : {
            wrong : "Use input instead of data for invokes",
        },
    },

    create(context) {
        return {
            [inMachine(`Property[key.name="invoke"] Property[key.name="data"]`)](node) {
                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(node.key, "input"),
                })
            },
        };
    },
};
