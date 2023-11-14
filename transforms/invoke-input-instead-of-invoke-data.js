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
            [`Property[key.name="invoke"] Property[key.name="data"]`](node) {
                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(node.key, "input"),
                })
            },
        };
    },
};
