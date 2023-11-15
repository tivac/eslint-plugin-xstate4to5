const { inMachine } = require("../util/in-machine.js");

// https://stately.ai/docs/migration#use-invokeinput-instead-of-invokedata
module.exports = {
    meta : {
        fixable : true,
        schema : [],

        messages : {
            wrong : `Use cond instead of guard`,
        },
    },

    create(context) {
        return {
            [inMachine(`Property[key.name="cond"]`)](node) {
                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(node.key, "guard"),
                })
            },
        };
    },
};
