const { inMachine } = require("../util/in-machine.js");

// https://stately.ai/docs/migration#use-invokeinput-instead-of-invokedata
module.exports = {
    meta : {
        fixable : true,
        schema : [],

        messages : {
            wrong : `Use output instead of data to return values`,
        },
    },

    create(context) {
        let inFinalNode = false;
        
        return {
            [inMachine(`ObjectExpression Property[key.name="type"][value.value="final"]`)](node) {
                inFinalNode = true;
            },
            
            [inMachine(`ObjectExpression:exit`)](node) {
                inFinalNode = false;
            },

            [inMachine(`Property[key.name="type"] ~ Property[key.name="data"]`)](node) {
                if(!inFinalNode) {
                    return;
                }

                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(node.key, "output"),
                })
            },
        };
    },
};
