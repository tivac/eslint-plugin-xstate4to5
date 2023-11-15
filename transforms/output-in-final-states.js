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
        return {
            [`ObjectExpression Property[key.name="type"][value.value="final"]`](node) {
                inFinalNode = true;
            },
            
            [`ObjectExpression:exit`](node) {
                inFinalNode = false;
            },

            [`Property[key.name="type"] ~ Property[key.name="data"]`](node) {
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
