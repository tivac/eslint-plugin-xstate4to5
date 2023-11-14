// https://stately.ai/docs/migration#use-invokeinput-instead-of-invokedata
module.exports = {
    meta : {
        fixable : true,
        schema : [],
    },

    create(context) {
        return {
            [`Property[key.name="invoke"] Property[key.name="data"]`](node) {
                context.report({
                    node,
                    message : "Use input instead of data for invokes",
                    fix : (fixer) => fixer.replaceText(node.key, "input"),
                })
            },
        };
    },
};
