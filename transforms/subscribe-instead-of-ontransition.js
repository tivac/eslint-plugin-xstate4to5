// https://stately.ai/docs/migration#use-invokeinput-instead-of-invokedata
module.exports = {
    meta : {
        fixable : true,
        schema : [],

        messages : {
            wrong : "Use .subscribe() instead of .onTransition()",
        },
    },

    create(context) {
        return {
            [`MemberExpression[property.name="onTransition"]`](node) {
                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(node.property, "subscribe"),
                })
            },
        };
    },
};
