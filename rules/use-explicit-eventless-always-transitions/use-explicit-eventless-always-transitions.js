const { inMachine } = require("../../util/in-machine.js");

// https://stately.ai/docs/migration#use-explicit-eventless-always-transitions
module.exports = {
    meta : {
        fixable : true,
        schema : [],

        messages : {
            wrong : `Use always instead of "" for eventless transitions`,
        },
    },

    create(context) {
        return {
            [inMachine(`Property[key.value=""]`)](node) {
                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(node.key, "always"),
                })
            },
        };
    },
};
