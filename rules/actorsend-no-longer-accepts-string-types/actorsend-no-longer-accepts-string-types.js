// https://stately.ai/docs/migration#use-invokeinput-instead-of-invokedata
export default {
    meta : {
		type : "problem",
        fixable : "code",
        schema : [],

        messages : {
            wrong : `Use .send({ type : "event" }) instead of .send("event")`,
        },
    },

    create(context) {
        return {
            [`CallExpression[callee.property.name="send"][arguments.0.type="Literal"]`](node) {
                
                context.report({
                    node,
                    messageId : "wrong",
                    fix : (fixer) => fixer.replaceText(node.arguments[0], `{ type : ${JSON.stringify(node.arguments[0].value)} }`),
                })
            },
        };
    },
};
